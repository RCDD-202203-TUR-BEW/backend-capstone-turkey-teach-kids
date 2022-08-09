const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'type',
  collection: 'user',
};
const baseSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    phone: {
      type: Number,
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
  },
  baseOptions
);
const User = mongoose.model('User', baseSchema);

let volunteerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
  },
  baseOptions
);

volunteerSchema = User.discriminator('Volunteer', volunteerSchema);

let ngoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    website: {
      type: String,
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
  },
  baseOptions
);

ngoSchema = User.discriminator('Ngo', ngoSchema);

module.exports = mongoose.model('User', baseSchema);
