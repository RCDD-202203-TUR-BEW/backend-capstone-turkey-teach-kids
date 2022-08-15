const { default: mongoose } = require('mongoose');
const Event = require('../models/event');
const { Volunteer } = require('../models/user');
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

exports.declineApplicant = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  const applicant = await Volunteer.findById(req.params.userId);
  const applicantIndex = event.pendingApplicants.indexOf(applicant._id);
  if (!applicant) {
    return next(new ErrorResponse('No user found', 404));
  }
  if (applicantIndex === -1) {
    return next(new ErrorResponse('User not found in pending applicants', 404));
  }
  await Event.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $push: { declinedApplicants: applicant._id } }
  );
  await Event.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { $pull: { pendingApplicants: applicant._id } }
  );
  const updatedEvent = await Event.findById(req.params.id);
  return res.status(200).json({ success: true, data: updatedEvent });
};
