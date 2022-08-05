const ErrorResponse = require('../utils/errorResponse');
const Ngo = require('../models/ngo');
const Volunteer = require('../models/volunteer');

exports.getProfile = async (req, res, next) => {
  if (req.user) {
    const user =
      (await Volunteer.findOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: req.user._id },
        { password: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0 }
      )) ||
      (await Ngo.findOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: req.user._id },
        { password: 0, createdAt: 0, updatedAt: 0, _id: 0, __v: 0 }
      ));
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
  return 'You are not logged in';
};

exports.updateProfile = async (req, res, next) => {
  if (req.user) {
    const user =
      (await Volunteer.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: req.user._id },
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            location: req.body.location,
            description: req.body.description,
            cv: req.body.cv,
            areaOfExp: req.body.areaOfExp,
          },
        },
        { new: true }
      )) ||
      (await Ngo.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: req.user._id },
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            avatar: req.body.avatar,
            website: req.body.website,
          },
        },
        { new: true }
      ));
    return res.status(200).json({
      success: true,
      data: user,
    });
  }
  return 'You are not logged in';
};
