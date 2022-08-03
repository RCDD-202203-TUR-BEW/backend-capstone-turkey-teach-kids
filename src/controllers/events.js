const Event = require('../models/event');
const Volunteer = require('../models/volunteer');
const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.getEvents = async (req, res, next) => {
  const events = await Event.find()
    .select('-pendingApplicants -approvedApplicants -declinedApplicants')
    .populate('ngo');
  return res.status(200).json({ success: true, data: events });
};
