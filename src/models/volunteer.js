const mongoose = require('mongoose');

const volunteer = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
    },
    phone: {
      type: Number,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    cv: {
      type: String,
    },
    appliedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
    areaOfExp: {
      type: [String],
      default: [],
    },
    providerId: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

module.exports = mongoose.model('Volunteer', volunteer);
