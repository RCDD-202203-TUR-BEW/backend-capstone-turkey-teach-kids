const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const Volunteer = require('../models/volunteer');
const Ngo = require('../models/ngo');

const saltRounds = 10;

exports.signup = async (req, res, next) => {
  const { email, username, password, password2 } = req.body;

  if ((await Volunteer.findOne({ email })) || (await Ngo.findOne({ email }))) {
    return next(new ErrorResponse('User already exist', 400));
  }
  if (password !== password2) {
    return next(new ErrorResponse("passwords don't match", 400));
  }
  const passwordHash = await bcrypt.hash(password, saltRounds);
  if (req.params.type === 'volunteer') {
    const user = await Volunteer.create({
      username,
      password: passwordHash,
      email,
    });
    res.setHeader('user', user.id);
    return res.status(200).json({ success: true, data: user });
  }
  if (req.params.type === 'ngo') {
    const user = await Ngo.create({
      username,
      password: passwordHash,
      email,
    });
    res.setHeader('user', user.id);
    return res.status(200).json({ success: true, data: user });
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
    { email: user.email, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: '14h',
    }
  );
  res.cookie('token', token, {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  return res.status(200).json({ success: true, data: user });
};
