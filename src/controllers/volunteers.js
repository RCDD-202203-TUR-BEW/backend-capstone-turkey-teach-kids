const ErrorResponse = require('../utils/errorResponse');
const { Volunteer } = require('../models/user');

exports.getVolunteer = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id, {
    password: 0,
    cv: 0,
  });
  if (!volunteer) {
    return next(new ErrorResponse('volunteer not found', 404));
  }

  return res.status(200).json({
    success: true,
    data: volunteer,
  });
};

exports.getAppliedEvents = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id, {
    appliedEvents: 1,
  }).populate('appliedEvents', [
    'avatar',
    'description',
    'tags',
    'location',
    'launchDate',
  ]);

  if (!volunteer) {
    return next(new ErrorResponse('No volunteer found to show events', 404));
  }
  return res.status(200).json({ success: true, data: volunteer.appliedEvents });
};
