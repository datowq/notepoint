const User = require('../models/users')
const msgs = require('./messages')

// Certain sections of this code were inspired by the following React email confirmation tutorial: 
// https://github.com/funador/react-confirm-email

exports.confirmEmail = (req, res) => {
  const { id } = req.params

  User.findById(id)
    .then(user => {

      if (!user) {
        res.json({ 'error': msgs.couldNotFind })
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

exports.newPassword = (req, res) => {
    const { id } = req.params

    User.findOne({ _id: id })
    .then(user => {

      if (!user) {
        res.json({ 'error': msgs.couldNotFind })
      }

      else {
        user.password = req.body.password;
        user.save()
          .then(() => res.json({ msg: msgs.newPassword }))
          .catch(err => console.log(err))
      }

    })
    .catch(err => console.log(err))

}