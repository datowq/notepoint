const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Certain sections of this code were inspired by the following React authorization flow tutorial: 
// https://www.newline.co/courses/build-a-spotify-connected-app/implementing-the-authorization-code-flow

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const URL = process.env.URL;
const uri1 = URL + '/spotify/callback/stats'
const uri2 = URL + '/spotify/callback/profile'
const redirect_uri = [uri1, uri2];
const front = process.env.FRONT;

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
const spotifyController = require('./spotify/controller')

// Spotify endpoints follow
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

app.get('/spotify/login/:redirectTo', function (req, res) {

  const redirectTo = req.params.redirectTo;

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = `
    ugc-image-upload,
    user-read-playback-state,
    user-read-currently-playing,
    playlist-read-private,
    playlist-read-collaborative,
    user-follow-read,
    user-top-read,
    user-read-recently-played,
    user-library-read,
    user-read-email,
    user-read-private`;

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirectTo === 'stats' ? redirect_uri[0] : redirect_uri[1],
        state: state,
        show_dialog: true,
      })
  );
});

app.get('/spotify/callback/:redirectTo', (req, res) => {

  const redirectTo = req.params.redirectTo;

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/' +
        querystring.stringify({
            error: 'state_mismatch'
        }));
  } else {
    res.clearCookie(stateKey);
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectTo === 'stats' ? redirect_uri[0] : redirect_uri[1],
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
    })
    .then(response => {
      if (response.status === 200) {

        const { access_token, refresh_token } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
        });

        if (redirectTo === 'stats') { res.redirect(`${front}/stats/?${queryParams}`); }
        else if (redirectTo === 'profile') { res.redirect(`${front}/profile/?${queryParams}`); }

      } else {
        res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
      }
    })
    .catch(error => {
      res.send(error);
    });
  }
});

app.get('/spotify/refreshtoken', (req, res) => {
  
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      res.send(error);
    });
});

app.post('/spotify/gettoken', (req, res) => {
  
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'client_credentials',
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {

        res.send(response.data)

      } else {
        res.send({ error: 'invalid_token' });
      }
    })
    .catch(error => {
      res.send(error);
    });
});

//User endpoints
app.post('/register', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const duplicateName = await User.findOne({ username: req.body.username });
  if (duplicateName) {
    res.json({ 'error' : 'duplicate username exists :\<'})
    return;
  }

  const duplicateEmail = await User.findOne({ email: req.body.email });
  if (duplicateEmail) {
    res.json({ 'error' : 'this email is already registered'})
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
    res.json({ 'error': 'we can\'t find your username :\<'})
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
      res.json({ 'error': 'incorrect password'})
    }
  }));
});

app.get('/email/confirm/:id', emailController.confirmEmail)

app.post('/email/recover', async (req, res) => {

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json({ 'error': 'there is no account registered with this email'})
    return;
  }

  sendEmail(user.email, templates.recover(user._id))
    .then(() => res.json({ msg: msgs.recover }))
    .catch(err => console.log(err));
})

app.post('/email/newpassword/:id', emailController.newPassword)

app.post('/storetoken/:user', spotifyController.storeCredentials)

app.get('/retrievetoken/:user', spotifyController.retrieveCredentials)

app.post('/postsnapshot/:user', spotifyController.storeSnapshot)

app.get('/gethistory/:user', spotifyController.retrieveHistory)

module.exports = app;