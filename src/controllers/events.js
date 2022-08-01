const Event = require('../models/event');
const Volunteer = require('../models/volunteer');
const ErrorResponse = require('../utils/errorResponse');

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .select('-pendingApplicants -approvedApplicants -declinedApplicants')
      .populate('ngo');
    if (!events) {
      return next(new ErrorResponse('No events found', 404));
    }
    return res.status(200).json(events);
  } catch (error) {
    return next(new ErrorResponse(error, 422));
  }
};
