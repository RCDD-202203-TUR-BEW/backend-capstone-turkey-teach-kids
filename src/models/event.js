const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      min: [120, 'Description should be longer'],
    },
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    launchDate: {
      type: Date,
      required: true,
    },
    ngo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ngo',
    },
    pendingApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
      },
    ],
    approvedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
      },
    ],
    declinedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Volunteer',
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
