/* eslint-disable no-underscore-dangle */
const Feedback = require('../models/feedback');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/mail');

exports.addFeedback = async (req, res, next) => {
  const newFeedback = await Feedback.create(req.body);
  sendEmail(req.body.email, 'We received your contact request!');
  return res.status(201).json({ success: true, data: newFeedback });
};
