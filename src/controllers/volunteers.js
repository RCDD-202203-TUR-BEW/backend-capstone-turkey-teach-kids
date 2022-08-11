const Volunteer = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');

exports.getAppliedEvents = async (req, res, next) => {
  const appliedEvents = await Volunteer.findById(req.params.id, {
    appliedEvents: 1,
  });
  if (!appliedEvents) {
    return next(new ErrorResponse('No volunteer found to show events', 404));
  }
  return res.status(200).json({ success: true, data: appliedEvents });
};
