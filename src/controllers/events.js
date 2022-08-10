/* eslint-disable no-underscore-dangle */
const Event = require('../models/event');
const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.getEvents = async (req, res) => {
  const events = await Event.find()
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo', 'name');
  return res.status(200).json({ success: true, data: events });
};

exports.deleteEvent = async (req, res, next) => {
  // auth checks will be added in the endpoints
  const event = await Event.findOne({
    _id: req.params.id,
    ngo: req.user._id,
  });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  await event.remove();
  return res.status(204).json({ success: true, data: event });
};
