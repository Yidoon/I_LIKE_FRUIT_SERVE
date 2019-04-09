const jwt = require('jsonwebtoken');
module.exports = function (email) {
  console.log('email', email);
  const token = jwt.sign({'email': email}, 'token', {'expiresIn': 60 * 60 * 24 * 60});
  return token;
}