const mongoose = require('mongoose'); //  This is for fake auth control, I will delete it later
const Event = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');

exports.addEvent = async (req, res) => {
  //  TODO: Change auth here
  req.user = {
    id: new mongoose.Types.ObjectId('62e9008803b4427103cb4462'),
  };

  const newEvent = new Event();
  newEvent.avatar = req.body.avatar;
  newEvent.description = req.body.description;
  newEvent.location = req.body.location;
  newEvent.launchDate = req.body.launchDate;
  newEvent.ngo = req.user.id;
  newEvent.topic = req.body.topic;
  if (req.body.pendingApplicantsId)
    newEvent.pendingApplicants.push(req.body.pendingApplicantsId);
  if (req.body.approvedApplicantsId)
    newEvent.approvedApplicants.push(req.body.approvedApplicantsId);
  if (req.body.declinedApplicantsId)
    newEvent.declinedApplicants.push(req.body.declinedApplicantsId);
  await newEvent.save();
  return res.status(201).json({ success: true, data: newEvent });
};
