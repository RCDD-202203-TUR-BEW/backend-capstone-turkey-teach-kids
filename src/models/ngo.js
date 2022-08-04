const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  publishedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
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

module.exports = mongoose.model('Ngo', ngoSchema);
