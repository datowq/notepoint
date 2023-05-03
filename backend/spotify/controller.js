const User = require('../models/users');
const msgs = require('../email/messages')

const SECS_IN_DAY = 86400;

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
          .then(() => res.json({ msg: 'new credentials successfully saved.'}))
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
      const len = user.snapshots.length;

      if (len > 0 && ((snapshot.timestamp - user.snapshots[len-1].timestamp) / 1000) < SECS_IN_DAY) {
        res.json({"error": 'you can only make one snapshot per day.'})
        return;
      }

      user.snapshots.push(snapshot);
      user.save()
          .then(() => res.json({ msg: 'snapshot was successfully saved.'}))
          .catch(err => res.json({ "error": 'your data could not be saved. please try again later.'}))
    }

  })
  .catch(err => console.log(err))
}

exports.retrieveHistory = (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*"); 

  const { user } = req.params

  User.findOne({ username: user })
  .then(user => {

    if (!user) {
      res.json({ msg: msgs.couldNotFind })
    }

    else if (user.snapshots.length === 0) {
      res.json({"error": 'there is no history to retrieve.'})
    }

    else {

      res.json({ snapshots: user.snapshots })
    }

  })
  .catch(err => console.log(err))
}