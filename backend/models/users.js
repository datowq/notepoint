const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

const SALT_WORK_FACTOR = 12;

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String, 
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    accessToken: {
      type: String,
      default: null
    }, 
    refreshToken: {
      type: String,
      default: null
    }, 
    timestamp: {
      type: String,
      default: null
    }, 
});

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);


    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;