const ErrorResponse = require('../utils/errorResponse');
const Ngo = require('../models/ngo');
const Volunteer = require('../models/volunteer');

exports.getProfile = async (req, res, next) => {
  const user = await Ngo.findOne({ _id: req.user.id });
  if (!user) {
    return next(new ErrorResponse('User not found', 404));
  }
  return res.json({ success: true, data: user });
};
