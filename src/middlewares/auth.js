const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

const isAuth = async (req, res, next) => {
  if (req.cookies) {
    const { token } = req.cookies;
    if (!token) {
      res.sendStatus(401);
    }
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: user._id });
      return next();
    } catch (err) {
      return next(new ErrorResponse('Invalid/expired token', 401));
    }
  }
};

module.exports = { isAuth };
