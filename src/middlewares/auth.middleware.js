const jwt = require('jsonwebtoken');
require('dotenv').config();

const userVerifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = { userVerifyToken };
