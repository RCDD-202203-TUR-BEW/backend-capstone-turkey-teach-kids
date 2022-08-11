const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const Volunteer = require('../models/volunteer');
const Ngo = require('../models/ngo');

const cookieAge = 14 * 24 * 3600 * 1000;
const saltRounds = 10;

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (req.params.type === 'volunteer') {
    const volunteer = await Volunteer.findOne({ email });
    if (volunteer) {
      return next(new ErrorResponse('User already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new Volunteer({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();
    res.setHeader('user', JSON.stringify(user));
    return res.status(201).json({
      success: true,
      data: user,
    });
  }
  if (req.params.type === 'ngo') {
    const ngo = await Ngo.findOne({ email });
    if (ngo) {
      return next(new ErrorResponse('User already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new Ngo({
      email,
      password: hashedPassword,
      username,
    });
    await user.save();
    res.setHeader('user', JSON.stringify(user));
    return res.status(201).json({
      success: true,
      data: user,
    });
  }
  return next(new ErrorResponse('Invalid user type', 400));
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user =
    (await Volunteer.findOne({ email })) || (await Ngo.findOne({ email }));
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  const token = jwt.sign(
    { _id: user._id.toHexString() },
    process.env.JWT_SECRET,
    {
      expiresIn: '14d',
    }
  );
  res.cookie('token', token, {
    maxAge: cookieAge,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  return res.status(200).json({ success: true, data: user });
};

exports.authenticationCookie = async (req, res) => {
  const { _id } = req.user;
  const userInToken = { _id };

  const token = jwt.sign(userInToken, process.env.JWT_SECRET, {
    expiresIn: '14 days',
  });

  res.cookie('token', token, {
    httpOnly: true,
    signed: true,
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ success: true, data: req.user });
};

exports.logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(205).json({ success: true });
};
