const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  const user = User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
}; 

module.exports = generateToken;
