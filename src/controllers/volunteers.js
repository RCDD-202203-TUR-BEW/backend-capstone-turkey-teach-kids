const ErrorResponse = require('../utils/errorResponse');
const Volunteer = require('../models/volunteer');

exports.getVolunteer = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id);
  if (!volunteer) {
    return next(new ErrorResponse('volunteer not found', 404));
  }

  return res.status(200).json({
    success: true,
    data: volunteer,
  });
};
exports.getVolunteers = async (req, res, next) => {
  const volunteers = await Volunteer.find();
  return res.status(200).json({ success: true, data: volunteers });
};