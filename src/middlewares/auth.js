const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const isAuth = (req, res, next) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (!token) {
      res.sendStatus(401);
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return next(new ErrorResponse('Invalid/expired token', 401));
    }
  }
<<<<<<< HEAD
  return next();
=======
>>>>>>> main
};

module.exports = { isAuth };
