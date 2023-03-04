const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

const client_id = process.env.CLIENT_ID;
const redirect_uri = 'http://localhost:5173/';

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.MONGODB_URI,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));

const User = require('./models/users');
const sendEmail = require('./email/send')
const msgs = require('./email/messages')
const templates = require('./email/template')
const emailController = require('./email/controller')

var generateRandomString = function (length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";


app.get('/spotify/login', function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = "user-read-private user-read-email user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

//User endpoints
app.post('/register', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const duplicateName = await User.findOne({ username: req.body.username });
  if (duplicateName) {
    res.json({ 'error' : 'Duplicate username exists.'})
    return;
  }

  const duplicateEmail = await User.findOne({ email: req.body.email });
  if (duplicateEmail) {
    res.json({ 'error' : 'This email is already registered.'})
    return;
  }

  User.create({ username: req.body.username, email: req.body.email, password: req.body.password })
    .then(newUser => sendEmail(newUser.email, templates.confirm(newUser._id)))
    .then(() => res.json({ msg: msgs.confirm }))
    .catch(err => console.log(err));
});

app.post('/login', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    res.json({ 'error': 'That username doesn\'t exist'})
    return;
  }
  else if (!user.confirmed) {
    sendEmail(user.email, templates.confirm(user._id))
      .then(() => res.json({ 'error' : msgs.resend }))
      return;
  }

  if (user.comparePassword(req.body.password, function(err, isMatch) {
    if (err) throw err;
    if (isMatch) {
      res.json(user);
    } else {
      res.json({ 'error': 'Incorrect password'})
    }
  }));
});

app.get('/email/confirm/:id', emailController.confirmEmail)

app.post('/email/recover', async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json({ 'error': 'There is no account registered with this email'})
    return;
  }

  sendEmail(user.email, templates.recover(user._id))
    .then(() => res.json({ msg: msgs.recover }))
    .catch(err => console.log(err));
})

app.post('/email/newpassword/:id', emailController.newPassword)

module.exports = app;