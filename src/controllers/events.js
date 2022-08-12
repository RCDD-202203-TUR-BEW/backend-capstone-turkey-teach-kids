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
  const eventOwner = event.ngo._id;
  if (eventOwner !== User._id) {
    return next(
      new ErrorResponse(
        'you can only approve or decline applicants of your event',
        400
      )
    );
  }
  const applicant = await Volunteer.findById(req.params.userId);
  if (!applicant) {
    return next(new ErrorResponse('No user found', 404));
  }
  if (event.pendingApplicants.inludes(applicant) === false) {
    return next(
      new ErrorResponse('This volunteer did not apply for this event', 404)
    );
  }
  event.approvedApplicants.push(applicant);
};
