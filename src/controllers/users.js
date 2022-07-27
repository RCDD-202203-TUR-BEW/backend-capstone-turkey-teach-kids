const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/errorResponse');
const Volunteer = require('../models/volunteer');

const saltRounds = 10;

/* This is an example of a router controller */
exports.getUser = async (req, res, next) => {
  /* const user = await User.findOne({});
  if (!user) {
    // This is an example of an error
    return next(new ErrorResponse('User not found', 404));
  }

  // This is an example of a successful response
  res.json({ success: true, data: user }); */
};

exports.signup = async (req, res, next) => {
  const { email, username, password, password2 } = req.body;

  if (await Volunteer.findOne({ email })) {
    return next(new ErrorResponse('User already exist', 400));
  }
  if (password !== password2) {
    return next(new ErrorResponse("passwords don't match", 400));
  }

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = await Volunteer.create({
      username,
      passwordHash,
      email,
    });
    res.setHeader('user', user.id);
    res.status(200).redirect('/user/authenticated');
  } catch (error) {
    console.log(error);
  }
  return 'test';
};
