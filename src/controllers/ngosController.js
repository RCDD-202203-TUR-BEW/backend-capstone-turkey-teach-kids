const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.getNgos = async (_, res, next) => {
  const ngos = await Ngo.find();
  return res.status(200).json({ success: true, data: ngos });
};
