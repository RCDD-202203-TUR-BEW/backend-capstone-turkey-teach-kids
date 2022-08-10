const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const isAuth = (req, res, next) => {
  if (req.cookies) {
    const token = req.signedCookies.token ?? req.cookies.token;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (err) {
      return next(new ErrorResponse('Invalid/expired token', 401));
    }
  }
};

module.exports = { isAuth };
