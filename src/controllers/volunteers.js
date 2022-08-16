const ErrorResponse = require('../utils/errorResponse');
const { Volunteer } = require('../models/user');

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

exports.getAppliedEvents = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id, {
    appliedEvents: 1,
  });
  if (!volunteer) {
    return next(new ErrorResponse('No volunteer found to show events', 404));
  }
  return res.status(200).json({ success: true, data: volunteer.appliedEvents });
};
