/* eslint-disable no-underscore-dangle */
const Event = require('../models/event');
const Ngo = require('../models/ngo');
const Volunteer = require('../models/volunteer');
const ErrorResponse = require('../utils/errorResponse');

exports.getEvents = async (req, res) => {
  const events = await Event.find()
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo', 'name');
  return res.status(200).json({ success: true, data: events });
};

exports.applyToEvent = async (req, res, next) => {
  const volunteer = await Volunteer.findById(req.user._id);
  if (!volunteer) {
    return next(new ErrorResponse('No volunteer found', 404));
  }
  const event = await Event.findById({
    _id: req.params.id,
  });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  event.pendingApplicants.push(req.user._id);
  await event.save();
  volunteer.appliedEvents.push(req.params.id);
  await volunteer.save();
  return res.status(200).json({ success: true, data: event });
};
