const ErrorResponse = require('../utils/errorResponse');
const { User } = require('../models/user');

exports.getProfile = async (req, res, next) => {
  const user = await User.findOne(
    { _id: req.user._id },
    { password: 0, updatedAt: 0 }
  );

  return res.status(200).json({
    success: true,
    data: user,
  });
};

exports.updateProfile = async (req, res, next) => {
  if ('email' in req.body) {
    const checkMail = await User.find({ email: req.body.email });
    if (checkMail.length > 0) {
      return next(new ErrorResponse('Email already taken', 400));
    }
  }
  if ('username' in req.body) {
    const checkUsername = await User.find({ username: req.body.username });
    if (checkUsername.length > 0) {
      return next(new ErrorResponse('Username already taken', 400));
    }
  }
  const user = await User.findOneAndUpdate(
    { _id: req.user._id, type: req.user.type },
    {
      $set: {
        ...req.body,
        avatar: req.files ? req.files.avatar?.[0].path : req.body.avatar,
        cv: req.files ? req.files.cv?.[0].path : req.body.cv,
      },
    },
    { new: true }
  );
  console.log(req.files);
  return res.status(200).json({
    success: true,
    data: user,
  });
};
