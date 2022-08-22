/* eslint-disable no-underscore-dangle */
const sendEmail = require('../utils/mail');

exports.confirmSubscription = async (req, res, next) => {
  sendEmail(req.body.email, 'Subscription is successful!');
  return res.status(200).json({ success: true, data: req.body });
};
