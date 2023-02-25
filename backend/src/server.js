const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);

mongoose.connect(
    process.env.DATABASE_URI,
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    }
  )
  .then(() => console.log('Connected to DB'))
  .catch(console.error);

app.listen(3001, () => console.log('Server listening on port 3001'));

const User = require('models/users');

//User endpoints
app.post('/register', async (req, res) => {
  const duplicate = await User.findOne({username: req.body.username});
  if (duplicate) {
    res.json({ 'error' : 'Duplicate username exists.'})
    return;
  }
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  res.json(user);
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


