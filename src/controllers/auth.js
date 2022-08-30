const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const { User } = require('../models/user');

const cookieAge = 14 * 24 * 3600 * 1000;
const saltRounds = 10;

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    return next(new ErrorResponse('User already exists', 400));
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = new User({
    email,
    password: hashedPassword,
    username,
    type: User.getTypeFromReqPath(req),
  });
  await user.save();
  res.setHeader('user', JSON.stringify(user));
  return res.status(201).json({
    success: true,
    data: user,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const token = jwt.sign(
    { _id: user._id.toHexString() },
    process.env.SECRET_KEY,
    {
      expiresIn: '14d',
    }
  );
  res.cookie('token', token, {
    httpOnly: false,
    signed: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });
  return res.status(200).json({ success: true, data: user });
};

exports.authenticationCookie = async (req, res) => {
  const { _id } = req.user;
  const userInToken = { _id };

  const token = jwt.sign(userInToken, process.env.SECRET_KEY, {
    expiresIn: '14 days',
  });

  res.cookie('token', token, {
    httpOnly: true,
    signed: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
  });

  return res.status(200).json({ success: true, data: req.user });
};

exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(205).json({ success: true });
};
