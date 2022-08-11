const Event = require('../models/event');
const { Ngo } = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');

exports.getEvents = async (req, res) => {
  const events = await Event.find()
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo', 'name');
  return res.status(200).json({ success: true, data: events });
};

exports.getEvent = async (req, res, next) => {
  const event = await Event.findById(req.params.id)
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo', 'name');
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  return res.status(200).json({ success: true, data: event });
};

exports.getRelatedEvents = async (req, res, next) => {
  const event = await Event.findById(req.params.id, { topic: 1 });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  const relatedEvents = await Event.find({ topic: event.topic })
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo', 'name');
  return res.status(200).json({ success: true, data: relatedEvents });
};

exports.updateEvent = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  const { avatar, description, location, launchDate, ngo, topic } = req.body;
  if (avatar) {
    event.avatar = avatar;
  }
  if (description) {
    event.description = description;
  }
  if (location) {
    event.location = location;
  }
  if (launchDate) {
    event.launchDate = launchDate;
  }
  if (ngo) {
    event.ngo = ngo;
  }
  if (topic) {
    event.topic = topic;
  }
  await event.save();
  return res.status(200).json({ success: true, data: event });
};
