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
    pendingApplicants: [],
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
    pendingApplicants: [],
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
    pendingApplicants: [],
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

describe("Testing events for routes doesn't require auth controls", () => {
  it('GET /api/events should retrieve all the events', async () => {
    const event = await createEvent(events[0]);
    const response = await request(app)
      .get(`/api/events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].avatar).toEqual(event.avatar);
    expect(response.body.data[0].description).toEqual(event.description);
    expect(response.body.data[0].location).toEqual(event.location);
    expect(new Date(response.body.data[0].launchDate)).toEqual(
      event.launchDate
    );
    expect(response.body.data[0].ngo).toEqual(event.ngo);
    expect(response.body.data[0].topic).toEqual(event.topic);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/events should retrieve an empty array if there is no event', async () => {
    const response = await request(app)
      .get(`/api/events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      data: [],
      success: true,
    });
  });

  it('GET /api/events/:id should retrieve a single event', async () => {
    const event = await createEvent(events[0]);
    const response = await request(app)
      .get(`/api/events/${event._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.avatar).toEqual(event.avatar);
    expect(response.body.data.description).toEqual(event.description);
    expect(response.body.data.location).toEqual(event.location);
    expect(new Date(response.body.data.launchDate)).toEqual(event.launchDate);
    expect(response.body.data.ngo).toEqual(event.ngo);
    expect(response.body.data.topic).toEqual(event.topic);
    expect(typeof response.body.data).toEqual('object');
  });

  it('GET /api/events/:id should not retrieve the event if the event is not found', async () => {
    const response = await request(app)
      .get(`/api/events/${eventId}`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No event found',
      success: false,
    });
  });

  it('GET /api/events/:id/related-events should retrieve all the related events', async () => {
    const event = await createEvent(events[0]);
    const event2 = await createEvent(events[2]);
    const response = await request(app)
      .get(`/api/events/${event._id}/related-events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].avatar).toEqual(event2.avatar);
    expect(response.body.data[0].description).toEqual(event2.description);
    expect(response.body.data[0].location).toEqual(event2.location);
    expect(new Date(response.body.data[0].launchDate)).toEqual(
      event.launchDate
    );
    expect(response.body.data[0].ngo).toEqual(event2.ngo);
    expect(response.body.data[0].topic).toEqual(event2.topic);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/events/:id/related-events the event if the event is not found', async () => {
    const response = await request(app)
      .get(`/api/events/${eventId}/related-events`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No event found',
      success: false,
    });
  });
});
