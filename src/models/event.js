const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: [120, 'Description should be longer'],
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
