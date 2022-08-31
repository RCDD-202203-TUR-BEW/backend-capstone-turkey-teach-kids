const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    description: {
      type: String,
      min: [120, 'Description should be longer'],
    },
    title: {
      type: String,
    },
    location: {
      type: String,
    },
    launchDate: {
      type: Date,
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
