const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.getNgos = async (_, res, next) => {
  const ngos = await Ngo.find();
  if (ngos.length === 0) {
    return next(new ErrorResponse('Ther are no listed Ngos yet', 404));
  }
  return res.status(200).json({ success: true, data: ngos });
};
