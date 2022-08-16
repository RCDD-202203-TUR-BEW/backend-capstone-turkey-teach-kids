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

describe("Testing events for routes doesn't require auth controls", () => {
  const eventId = '62f92427222f8c86c4bf1bd7';
  it('GET /api/events should retrieve all the events', async () => {
    const event = await Event.create(events[0]);
    const response = await request(app)
      .get(`/api/events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].avatar).toEqual(event.avatar);
    expect(response.body.data[0].description).toEqual(event.description);
    expect(response.body.data[0].location).toEqual(event.location);
    // expect(response.body.data[0].launchDate).toEqual(event.launchDate);
    expect(response.body.data[0].ngoId).toEqual(event.ngoId);
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
    const event = new Event(events[0]);
    await event.save();
    const response = await request(app)
      .get(`/api/events/${event._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.avatar).toEqual(event.avatar);
    expect(response.body.data.description).toEqual(event.description);
    expect(response.body.data.location).toEqual(event.location);
    // expect(response.body.data.launchDate).toEqual(event.launchDate);
    expect(response.body.data.ngoId).toEqual(event.ngoId);
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
    const event = new Event(events[0]);
    const event2 = new Event(events[2]);
    await event.save();
    await event2.save();
    const response = await request(app)
      .get(`/api/events/${event._id}/related-events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].avatar).toEqual(event2.avatar);
    expect(response.body.data[0].description).toEqual(event2.description);
    expect(response.body.data[0].location).toEqual(event2.location);
    // expect(response.body.data[0].launchDate).toEqual(event.launchDate);
    expect(response.body.data[0].ngoId).toEqual(event2.ngoId);
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

  it('GET /api/volunteers/:id/applied-events should retrieve all the applied events of the volunteer', async () => {
    const event = await Event.create(events[0]);
    const volunteer = await Volunteer.create(volunteerUser);
    console.log(event, volunteer);
    volunteer.appliedEvents.push(event._id);
    await volunteer.save();
    console.log(volunteer);
    const response = await request(app).get(
      `/api/volunteers/${volunteer._id}/applied-events`
    );
    console.log(response);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.appliedEvents).toEqual(volunteer.appliedEvents);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('GET /api/volunteers/:id/applied-events should give 404 if the volunteer is not found', async () => {
    const response = await request(app)
      .get(`/api/volunteers/${eventId}/applied-events`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No volunteer found to show events',
      success: false,
    });
  });
});

describe('Testing events for routes require auth controls', () => {
  it('GET /api/volunteers/:id/applied-events should retrieve all the applied events of the volunteer', async () => {
    const event = await Event.create(events[0]);
    const volunteer = await Volunteer.create(volunteerUser);
    volunteer.appliedEvents.push(event._id);
    await volunteer.save();
    const volunteerToken = jwt.sign(
      { _id: volunteer._id },
      process.env.SECRET_KEY,
      {
        expiresIn: '1h',
      }
    );
    const volunteerCookie = `token=${volunteerToken}`;
    const response = await request(app)
      .get(`/api/volunteers/${volunteer._id}/applied-events`)
      .set('Cookie', volunteerCookie)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].appliedEvents).toEqual(
      volunteer.appliedEvents
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
