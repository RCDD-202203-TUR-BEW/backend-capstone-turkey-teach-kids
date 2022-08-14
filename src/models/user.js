const mongoose = require('mongoose');

const options = {
  discriminatorKey: 'type',
  collection: 'users',
  timestamps: true,
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
    provider: {
      type: String,
    },
    providerId: {
      type: String,
    },
  },
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  {
    ...options,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password;
        delete ret.id;
        delete ret.__v;
      },
    },
  }
);
const User = mongoose.model('User', baseSchema);

const volunteerSchema = new mongoose.Schema(
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
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  { ...options }
);

const Volunteer = User.discriminator('Volunteer', volunteerSchema);

const ngoSchema = new mongoose.Schema(
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
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  { ...options }
);

const Ngo = User.discriminator('Ngo', ngoSchema);

User.getTypeFromReqPath = (req) => {
  const path = req.path.split('/')[2];
  if (path === 'volunteer') {
    return 'Volunteer';
  }
  if (path === 'ngo') {
    return 'Ngo';
  }
};

module.exports = { User, Volunteer, Ngo };
