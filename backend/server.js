const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.MONGO_URI,
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

//User endpoints
app.post('/register', async (req, res) => {
  const duplicateName = await User.findOne({username: req.body.username});
  if (duplicateName) {
    res.json({ 'error' : 'Duplicate username exists.'})
    return;
  }
  const duplicateEmail = await User.findOne({username: req.body.email});
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
  const user = await User.findOne({username: req.body.username});
  if (!user) {
    res.json({ 'error': 'That username doesn\'t exist'})
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

module.exports = app;