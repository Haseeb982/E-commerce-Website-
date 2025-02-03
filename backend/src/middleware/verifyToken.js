const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    if (!token) {
      res.send({ message: 'invalid token' });
    }
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (error) {
    console.log('verify error', error);
    res.status(401).send({ message: 'Error while verifying token' });
  }
};

module.exports = verifyToken;

