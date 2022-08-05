/* eslint-disable no-underscore-dangle */
const Event = require('../models/event');
const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.deleteEvent = async (req, res, next) => {
  //  Check if there is a logged in user
  if (!req.user) {
    return next(
      new ErrorResponse('You need to sign in to delete an event', 403)
    );
  }
  //  Check if the logged in user in an ngo
  const ngo = await Ngo.findById(req.user._id);
  if (!ngo) {
    return next(
      new ErrorResponse('You are not authorized to delete an event', 403)
    );
  }
  const event = await Event.findOne({
    _id: req.params.id,
  });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  await event.remove();
  return res.status(204).json({ success: true, data: event });
};
