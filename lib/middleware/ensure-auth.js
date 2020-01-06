const User = require('../models/User');

module.exports = (req, res, next) => {
  // get the session cookie
  const token = req.cookies.session;
  // find user from parsed cookie
  User
    .findByToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
};
