const mongoose = require('mongoose');
const Event = require('../models/event');
const { Ngo, User, Volunteer } = require('../models/user');
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

exports.approveApplicant = async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  // const eventOwner = event.ngo;
  // if (eventOwner !== User._id) {
  //   return next(
  //     new ErrorResponse(
  //       'you can only approve or decline applicants of your event',
  //       400
  //     )
  //   );
  // }
  const applicant = await Volunteer.findById(req.params.userId);
  const applicantIndex = event.pendingApplicants.indexOf(applicant._id);
  if (applicantIndex === -1) {
    return next(
      new ErrorResponse('This Volunteer did not apply for this event', 400)
    );
  }
  const updatedPendingApplicants = event.pendingApplicants.splice(
    applicantIndex,
    1
  );
  // const updatedApprovedApplicants = event.approvedApplicants.push(
  //   applicant._id
  // );
  console.log(event);
  await Event.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(req.params.id) },
    { pendingApplicants: updatedPendingApplicants }
  );
  // await Event.findOneAndUpdate(
  //   { _id: mongoose.Types.ObjectId(req.params.id) },
  //   { approvedApplicants: updatedApprovedApplicants }
  // );
  return res.status(200).json({ success: true, data: event });
};
