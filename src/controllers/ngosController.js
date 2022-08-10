const Ngo = require('../models/ngo');
const ErrorResponse = require('../utils/errorResponse');

exports.getNgo = async (req, res, next) => {
  const ngo = await Ngo.findById(req.params.id);

  if (ngo.length === 0) {
    return next(
      new ErrorResponse('This Id dose not match any registered NGO ', 404)
    );
  }
  return res.status(200).json({ success: true, data: ngo });
};
