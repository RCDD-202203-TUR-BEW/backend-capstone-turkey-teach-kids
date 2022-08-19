const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const Event = require('../../models/event');
const { Volunteer, Ngo } = require('../../models/user');
const app = require('../../app');

jest.setTimeout(10000);

const ngoUser = {
  username: 'JohnDoe',
  password: 'Pass123',
  email: 'john.doe@gmail.com',
  type: 'Ngo',
};

const volunteerUser = {
  username: 'JaneDoe',
  password: 'Pass123',
  email: 'jane.doe@gmail.com',
  appliedEvents: [],
  type: 'Volunteer',
};

const events = [
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Antalya',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    topic: 'Coding',
  },
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'İstanbul',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    topic: 'English',
  },
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Antalya',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    topic: 'Coding',
  },
];

beforeEach(async () => {
  await Event.deleteMany();
  await Volunteer.deleteMany();
  await Ngo.deleteMany();
});
afterEach(async () => {
  await Event.deleteMany();
  await Volunteer.deleteMany();
  await Ngo.deleteMany();
});
afterAll(async () => {
  await mongoose.connection.close();
});

const eventId = '62f92427222f8c86c4bf1bd7';
const volunteerId = '62f92427222f8c86c4bf1bd7';

function createEvent(eventLoad) {
  return Event.create(eventLoad);
}

function createVolunteer() {
  return Volunteer.create(volunteerUser);
}

function createNgo() {
  return Ngo.create(ngoUser);
}

function createToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  return `token=${token}`;
}
const volunteers = [
  {
    _id: '1',
    firstName: 'sobi',
    lastName: 'shams',
    email: 'sobhanshams1471@hotmail.com',
    password: 'volunteer passward',
    phone: '058899999',
    cv: 'volunteer cv',
    location: 'location',
    description: 'description',
    areaOfExp: 'newarea',
    type: 'Volunteer',
    providerId: 'volunteer ID',
  },
  {
    _id: '2',
    firstName: 'hamed',
    lastName: 'loi',
    email: 'hamedloi1234@hotmail.com',
    password: 'volunteer passward',
    phone: '059897676',
    cv: 'volunteer cv',
    location: 'location',
    description: 'description',
    areaOfExp: 'newarea',
    type: 'Volunteer',
    providerId: 'volunteer ID',
  },
];
describe("Testing volunteer for routes doesn't require auth controls", () => {
  it('GET /api/volunteers/:id should retrieve one volunteer that match the requested id', (done) => {
    request(app)
      .get(`/api/volunteers/${volunteers[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(volunteers[0].name);
        done();
      });
  });
});

describe('Testing volunteer for routes require auth controls', () => {
  it('GET /api/volunteers/:id/applied-events should retrieve all the applied events of the volunteer', async () => {
    const volunteer = await createVolunteer();
    const volunteerCookie = createToken(volunteer);
    const event = await createEvent(events[0]);
    const event2 = await createEvent(events[1]);
    volunteer.appliedEvents.push(event._id, event2._id);
    await volunteer.save();
    const response = await request(app)
      .get(`/api/volunteers/${volunteer._id}/applied-events`)
      .set('Cookie', volunteerCookie)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0]._id).toEqual(
      volunteer.appliedEvents[0].toString()
    );
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/volunteers/:id/applied-events should give 401 if there is no registered user', async () => {
    const response = await request(app)
      .get(`/api/volunteers/${volunteerUser._id}/applied-events`)
      .expect(401);
    expect(response.text).toEqual('Unauthorized');
  });
});
