/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const Event = require('../models/event');
const { Ngo, Volunteer } = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const { User } = require('../models/user');

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
  const event = await Event.findById(req.params.id, { tags: 1 });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  const relatedEvents = await Event.find({
    tags: { $in: event.tags },
  })
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

exports.applyToEvent = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  event.pendingApplicants.addToSet(req.user._id);
  await event.save();
  return res.status(200).json({
    success: true,
    data: 'you have successfully applied to the event',
  });
};

exports.approveApplicant = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  const eventOwner = event.ngo.toString();
  if (eventOwner !== req.user.id) {
    return next(
      new ErrorResponse(
        'you can only approve or decline applicants of your event',
        400
      )
    );
  }
  const applicant = await Volunteer.findById(req.params.userId);
  const applicantIndex = event.pendingApplicants.indexOf(applicant._id);
  if (applicantIndex === -1) {
    return next(
      new ErrorResponse('This Volunteer did not apply for this event', 400)
    );
  }
  await Event.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    {
      $pull: { pendingApplicants: applicant._id },
      $push: { approvedApplicants: applicant._id },
    }
  );

  const updatedEvent = await Event.findById(req.params.id);

  return res.status(200).json({ success: true, data: updatedEvent });
};

exports.getPendingApplicants = async (req, res, next) => {
  const event = await Event.findOne({ _id: req.params.id }).populate(
    'pendingApplicants',
    'email firstName lastName avatar'
  );

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
  return res.status(200).json({ success: true, data: event.pendingApplicants });
};
