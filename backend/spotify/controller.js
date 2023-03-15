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

exports.storeSnapshot = (req, res) => {

  res.header("Access-Control-Allow-Origin", "*"); 

  const { user } = req.params

  User.findOne({ username: user })
  .then(user => {

    if (!user) {
      res.json({ msg: msgs.couldNotFind })
    }

    else {

      const snapshot = req.body.snapshot;
      user.snapshots.push(snapshot);
      user.save()
          .then(() => res.json({ msg: 'Snapshot was successfully saved.'}))
          .catch(err => res.json({ "error": 'Your data could not be saved. Please try again later.'}))
    }

  })
  .catch(err => console.log(err))
}

exports.retrieveSnapshot = (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*"); 

  const { user } = req.params

  User.findOne({ username: user })
  .then(user => {

    if (!user) {
      res.json({ msg: msgs.couldNotFind })
    }

    else if (user.snapshots.length === 0) {
      res.json({"error": 'There is no snapshot to retrieve.'})
    }

    else {

      res.json({ tracks: user.snapshots[0].tracks, artists: user.snapshots[0].artists, 
        recentlyPlayed: user.snapshots[0].recentlyPlayed})
    }

  })
  .catch(err => console.log(err))
}