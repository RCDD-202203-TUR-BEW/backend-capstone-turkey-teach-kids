const mongoose = require('mongoose'); // This is for fake auth control, I'll delete it later
const Event = require('../models/event');
const ErrorResponse = require('../utils/errorResponse');

exports.deleteEvent = async (req, res, next) => {
  //  TODO: Change auth here
  req.user = {
    ngo: new mongoose.Types.ObjectId('62e9008803b4427103cb4462'),
  };
  const event = await Event.findOne({
    _id: req.params.id,
    ngo: req.user.ngo,
  });
  if (!event) {
    return next(new ErrorResponse('No event found', 404));
  }
  // if (event.ngo !== req.user.ngo) {
  //   return next(
  //     new ErrorResponse('You are not authorized to delete this event', 403)
  //   );
  // }
  await event.remove();
  return res.status(204).json({ success: true, data: event });
};
