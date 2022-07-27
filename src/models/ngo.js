const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  ngoName: {
    type: String,
    required: true,
  },
  webSite: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  publishedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  provider: {
    type: String,
  },
  providerId: {
    type: String,
  },
});

module.exports = mongoose.model('ngo', ngoSchema);
