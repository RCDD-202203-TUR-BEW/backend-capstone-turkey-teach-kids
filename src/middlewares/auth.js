const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const isAuth = (req, res, next) => {
  if (req.cookies) {
    const token = req.signedCookies.token ?? req.cookies.token;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
      return next();
    } catch (err) {
      return next(new ErrorResponse('Invalid/expired token', 401));
    }
  }
};

const isNgo = (req, res, next) => {
  if (req.user.type !== 'Ngo') {
    return next(new ErrorResponse('Invalid user type', 400));
  }
  return next();
};

const isVolunteer = (req, res, next) => {
  if (req.user.type !== 'Volunteer') {
    return next(new ErrorResponse('Invalid user type', 400));
  }
  return next();
};

module.exports = { isAuth, isNgo, isVolunteer };
