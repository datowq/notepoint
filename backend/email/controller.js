const User = require('../models/users')
const sendEmail = require('./send')
const msgs = require('./messages')
const templates = require('./template')

// https://github.com/funador/react-confirm-email

exports.confirmEmail = (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => {

      if (!user) {
        res.json({ msg: msgs.couldNotFind })
      }
      
      else if (user && !user.confirmed) {
        User.findByIdAndUpdate(id, { confirmed: true })
          .then(() => res.json({ msg: msgs.confirmed }))
          .catch(err => console.log(err))
      }

      else  {
        res.json({ msg: msgs.alreadyConfirmed })
      }

    })
    .catch(err => console.log(err))
}