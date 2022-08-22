const { Ngo } = require('../models/user');
const ErrorResponse = require('../utils/errorResponse');
const Event = require('../models/event');

exports.getNgo = async (req, res, next) => {
  const ngo = await Ngo.findById(req.params.id);

  if (!ngo) {
    return next(
      new ErrorResponse('This Id dose not match any registered NGO ', 404)
    );
  }
  return res.status(200).json({ success: true, data: ngo });
};

exports.getNgos = async (req, res, next) => {
  const ngos = await Ngo.find();
  return res.status(200).json({ success: true, data: ngos });
};
exports.getNgoEvents = async (req, res, next) => {
  const ngo = await Ngo.findById(req.params.id);
  const { tag } = req.query;
  if (!ngo) {
    return next(
      new ErrorResponse('This Id dose not match any registered NGO ', 404)
    );
  }
  const query = { ngo: req.params.id };
  if (tag) {
    query.tags = tag;
  }
  const events = await Event.find(query);
  return res.status(200).json({ success: true, data: events });
};
