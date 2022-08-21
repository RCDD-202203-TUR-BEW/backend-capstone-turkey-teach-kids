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
  if ('email' in req.body || 'username' in req.body) {
    const checkMail3 = await User.find({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (checkMail3.length > 0) {
      return next(new ErrorResponse('Email or username already taken', 400));
    }
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id, type: req.user.type },
    {
      $set: {
        avatar: req.files ? req.files[0].path : req.body.avatar,
        ...req.body,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: user,
  });
};
