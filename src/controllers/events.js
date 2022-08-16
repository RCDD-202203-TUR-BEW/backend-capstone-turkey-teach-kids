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

exports.addEvent = async (req, res, next) => {
  // Create new event
  const newEvent = await Event.create(req.body);
  newEvent.ngo = req.user._id;
  await newEvent.save();
  //  Add event to the ngo
  console.log(req.user.type);
  const ngo = await Ngo.findById(req.user._id, {});
  ngo.publishedEvents.push(newEvent._id);
  await ngo.save();
  return res.status(201).json({ success: true, data: newEvent });
};
