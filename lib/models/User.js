const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, 
{ 
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
});

schema.statics.authenticate = async function({ email, password }) {
  const user = await this.findOne({ email });
  if(!user){
    const err = new Error('Invalid email/password');
    err.status = 401;
    throw err;
  }
  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if(!isValidPassword){
    const err = new Error('Invalid email/password');
    err.status = 401;
    throw err;
  }
  return user;
};

schema.methods.authToken = function() {
  return jwt.sign(this.toJSON(), process.env.APP_SECRET, {
    expiresIn: '24h'
  });
};


module.exports = mongoose.model('User', schema);
