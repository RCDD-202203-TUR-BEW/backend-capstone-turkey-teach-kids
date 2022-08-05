/* eslint-disable no-underscore-dangle */
const Event = require('../models/event');
const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.addEvent = async (req, res, next) => {
  //  Check if there is a logged in user
  if (!req.user) {
    return next(new ErrorResponse('You need to sign in to add an event', 403));
  }
  //  Check if the logged in user in an ngo
  const ngo = await Ngo.findById(req.user._id);
  if (!ngo) {
    return next(
      new ErrorResponse('You are not authorized to add an event', 403)
    );
  }
  // Create new event
  const newEvent = new Event();
  newEvent.avatar = req.body.avatar;
  newEvent.description = req.body.description;
  newEvent.location = req.body.location;
  newEvent.launchDate = req.body.launchDate;
  newEvent.ngo = req.user._id;
  newEvent.topic = req.body.topic;
  if (req.body.pendingApplicantsId)
    newEvent.pendingApplicants.push(req.body.pendingApplicantsId);
  if (req.body.approvedApplicantsId)
    newEvent.approvedApplicants.push(req.body.approvedApplicantsId);
  if (req.body.declinedApplicantsId)
    newEvent.declinedApplicants.push(req.body.declinedApplicantsId);
  await newEvent.save();
  //  Add event to the ngo
  ngo.publishedEvents.push(newEvent._id);
  await ngo.save();
  return res.status(201).json({ success: true, data: newEvent });
};
