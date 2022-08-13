const { Volunteer } = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

exports.getAppliedEvents = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.params.id, {
    appliedEvents: 1,
  });
  if (!volunteer) {
    return next(new ErrorResponse('No volunteer found to show events', 404));
  }
  if (!volunteer.appliedEvents?.length === 0) {
    return next(
      new ErrorResponse("The volunteer hasn't applied for any event yet", 404)
    );
  }
  return res.status(200).json({ success: true, data: volunteer.appliedEvents });
};
