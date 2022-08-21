const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: [5, 'Full name should be longer'],
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      min: [20, 'Message should be longer'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
