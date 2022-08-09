const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/user');

const cookieAge = 14 * 24 * 3600 * 1000;
const saltRounds = 10;

exports.signup = async (req, res, next) => {
  const { email, password, username } = req.body;

  if (req.params.type === 'volunteer') {
    const volunteer = await User.findOne({ email });
    if (volunteer) {
      return next(new ErrorResponse('User already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      type: 'Volunteer',
    });
    await user.save();
    res.setHeader('user', JSON.stringify(user));
    return res.status(201).json({
      success: true,
      data: user,
    });
  }
  if (req.params.type === 'ngo') {
    const ngo = await User.findOne({ email });
    if (ngo) {
      return next(new ErrorResponse('User already exists', 400));
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({
      email,
      password: hashedPassword,
      username,
      type: 'Ngo',
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
