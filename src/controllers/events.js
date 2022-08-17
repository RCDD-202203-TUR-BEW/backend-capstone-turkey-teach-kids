/* eslint-disable no-underscore-dangle */
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

exports.deleteEvent = async (req, res, next) => {
  const event = await Event.findOne({ _id: req.params.id });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  if (event.ngo.toString() !== req.user._id.toString()) {
    return next(
      new ErrorResponse(
        "You don't have permissions to perform this operation",
        401
      )
    );
  }
  await event.remove();
  return res.status(204).json({ success: true, data: event });
};

exports.addEvent = async (req, res, next) => {
  // Create new event
  req.body.ngo = req.user._id;
  const newEvent = await Event.create(req.body);
  //  Add event to the ngo
  await Ngo.updateOne(
    { _id: req.user._id },
    { $push: { publishedEvents: newEvent._id } }
  );
  return res.status(201).json({ success: true, data: newEvent });
};
