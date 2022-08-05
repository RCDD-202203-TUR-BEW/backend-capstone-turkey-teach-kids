const ErrorResponse = require('../utils/errorResponse');
const Ngo = require('../models/ngo');
const Volunteer = require('../models/volunteer');

exports.getProfile = async (req, res, next) => {
  const volunteer = await Volunteer.findOne(
    { _id: req.user._id },
    { password: 0, updatedAt: 0 }
  );
  const ngo = await Ngo.findOne(
    { _id: req.user._id },
    { password: 0, updatedAt: 0 }
  );
  const user = volunteer || ngo;

  return res.status(200).json({
    success: true,
    data: user,
  });
};

exports.updateProfile = async (req, res, next) => {
  const checkMail1 = await Volunteer.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  const checkMail2 = await Ngo.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });

  const checkMail = checkMail1.concat(checkMail2);
  if (checkMail.length > 0) {
    return next(new ErrorResponse('Email or username already taken', 400));
  }
  const volunteer = await Volunteer.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true }
  );
  const ngo = await Ngo.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true }
  );
  const user = volunteer || ngo;

  return res.status(200).json({
    success: true,
    data: user,
  });
};
