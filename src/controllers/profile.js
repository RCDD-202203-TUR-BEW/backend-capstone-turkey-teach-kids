const ErrorResponse = require('../utils/errorResponse');
const { User } = require('../models/user');
const { uploadFileToGCS } = require('../services/google-cloud');

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
  const avatarPath = await uploadFileToGCS(req.files.avatar?.[0]);
  req.body.avatar = avatarPath;

  const cvPath = await uploadFileToGCS(req.files.cv?.[0]);
  req.body.cv = cvPath;

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
      $set: req.body,
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: user,
  });
};
