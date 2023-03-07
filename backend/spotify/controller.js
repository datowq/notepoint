const crypto = require('crypto');
const User = require('../models/users');
const msgs = require('../email/messages')

exports.storeCredentials = (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");

    const { user } = req.params

    User.findOne({ username: user })
    .then(user => {

      if (!user) {
        res.json({ msg: msgs.couldNotFind })
      }

      else {
        user.accessToken = req.body.accessToken;
        user.refreshToken = req.body.refreshToken;
        user.timestamp = req.body.timestamp;
        user.save()
          .then(() => res.json({ msg: 'New credentials successfully saved.'}))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))
}

exports.retrieveCredentials = (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    
    const { user } = req.params

    User.findOne({ username: user })
    .then(user => {

      if (!user) {
        res.json({ msg: msgs.couldNotFind })
      }

      else {

        res.json({ accessToken: user.accessToken, refreshToken: user.refreshToken, timestamp: user.timestamp })
      }

    })
    .catch(err => console.log(err))

}