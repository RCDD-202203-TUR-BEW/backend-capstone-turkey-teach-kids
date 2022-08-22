const mongoose = require('mongoose');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const Event = require('../../models/event');
const { Volunteer, Ngo } = require('../../models/user');
const app = require('../../app');
const { User } = require('../../models/user');

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
    title: 'sometitle',
    location: 'Antalya',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    pendingApplicants: [],
    tags: ['Turkish', 'Bootcamp'],
  },
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'sometitle2',
    location: 'İstanbul',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    pendingApplicants: [],
    tags: ['English', 'Bootcamp'],
  },
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'sometitle',
    location: 'Antalya',
    launchDate: new Date(),
    ngoId: '62e9008803b4427103cb4462',
    pendingApplicants: [],
    tags: ['Coding', 'Bootcamp'],
  },
  {
    _id: '62f92429222f8c86c4bf1bd7',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'sometitle',
    location: 'Antalya',
    launchDate: '2022-12-28T21:00:00.000Z',
    ngo: '62f92429222f8c86c4bf2bd7',
    pendingApplicants: [
      {
        _id: '62f92427222f8c86c4bf2bd7',
        username: 'JaneDoe',
        password: 'Pass123',
        email: 'jane.doe@gmail.com',
        appliedEvents: [],
        type: 'Volunteer',
      },
    ],
    tags: ['Backend', 'Bootcamp'],
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
    expect(response.body.data[0].title).toEqual(event.title);
    expect(response.body.data[0].location).toEqual(event.location);
    expect(new Date(response.body.data[0].launchDate)).toEqual(
      event.launchDate
    );
    expect(response.body.data[0].ngo).toEqual(event.ngo);
    expect(response.body.data[0].tags[0]).toEqual(event.tags[0]);
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
    expect(response.body.data.title).toEqual(event.title);
    expect(response.body.data.location).toEqual(event.location);
    expect(new Date(response.body.data.launchDate)).toEqual(event.launchDate);
    expect(response.body.data.ngo).toEqual(event.ngo);
    expect(response.body.data.tags[0]).toEqual(event.tags[0]);
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
    expect(response.body.data[0].title).toEqual(event2.title);
    expect(response.body.data[0].location).toEqual(event2.location);
    expect(new Date(response.body.data[0].launchDate)).toEqual(
      event.launchDate
    );
    expect(response.body.data[0].ngo).toEqual(event2.ngo);
    expect(
      response.body.data[0].tags.some((el) => event2.tags.includes(el))
    ).toEqual(true);

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

describe('Testing events for routes require auth controls', () => {
  it('DELETE /api/events/:id should delete the related event', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const event = await createEvent(events[0]);
    event.ngo = ngo._id;
    await event.save();
    const response = await request(app)
      .delete(`/api/events/${event._id}`)
      .set('Cookie', ngoCookie)
      .expect(204);
  });

  it('DELETE /api/events/:id should not return the event if the event is not found', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const response = await request(app)
      .delete(`/api/events/${eventId}`)
      .set('Cookie', ngoCookie)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No event found',
      success: false,
    });
  });

  it('DELETE /api/events/:id should refuse to delete event without authorization', async () => {
    const event = await createEvent(events[0]);
    const response = await request(app)
      .delete(`/api/events/${event._id}`)
      .expect(401);
    expect(response.text).toEqual('Unauthorized');
  });

  it('DELETE /api/events/:id should refuse to delete event without authentication', async () => {
    const volunteer = await createVolunteer();
    const event = await createEvent(events[0]);
    const volunteerCookie = createToken(volunteer);
    const response = await request(app)
      .delete(`/api/events/${event._id}`)
      .set('Cookie', volunteerCookie)
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      error: 'Invalid user type',
    });
  });

  it('POST /api/events should add a new event', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    events[0].ngo = ngo._id;
    const event = await createEvent(events[0]);
    ngo.publishedEvents.push(event._id);
    await ngo.save();
    const response = await request(app)
      .post(`/api/events`)
      .set('Cookie', ngoCookie)
      .send(events[0]);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.avatar).toEqual(event.avatar);
    expect(response.body.data.description).toEqual(event.description);
    expect(response.body.data.title).toEqual(event.title);
    expect(response.body.data.location).toEqual(event.location);
    expect(new Date(response.body.data.launchDate)).toEqual(event.launchDate);
    expect(response.body.data.ngo).toEqual(event.ngo.toString());
    expect(response.body.data.tags[0]).toEqual(event.tags[0]);
  });

  it('POST /api/events should refuse to add event without authorization', async () => {
    const response = await request(app).post(`/api/events`).expect(401);
    expect(response.text).toEqual('Unauthorized');
  });

  it('POST /api/events should refuse to add event without authentication', async () => {
    const volunteer = await createVolunteer();
    const volunteerCookie = createToken(volunteer);
    const response = await request(app)
      .post(`/api/events`)
      .set('Cookie', volunteerCookie)
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      error: 'Invalid user type',
    });
  });

  it('POST /api/events/:id/apply should apply for volunteer a new event', async () => {
    const volunteer = await createVolunteer();
    const volunteerCookie = createToken(volunteer);
    events[0].pendingApplicants.push(volunteer._id);
    const event = await createEvent(events[0]);
    volunteer.appliedEvents.push(event._id);
    await volunteer.save();
    const response = await request(app)
      .post(`/api/events/${event._id}/apply`)
      .set('Cookie', volunteerCookie)
      .send(events[0]);
    expect(response.body.success).toEqual(true);
    expect(response.body.data).toEqual(
      'you have successfully applied to the event'
    );
  });

  it('POST /api/events/:id/apply should refuse to apply for volunteer event without authorization', async () => {
    const event = await createEvent(events[0]);
    const response = await request(app)
      .post(`/api/events/${event._id}/apply `)
      .expect(401);
    expect(response.text).toEqual('Unauthorized');
  });

  it('POST /api/events/:id/apply should refuse to apply for volunteer event without authentication', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const event = await createEvent(events[0]);
    const response = await request(app)
      .post(`/api/events/${event._id}/apply `)
      .set('Cookie', ngoCookie)
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      error: 'Invalid user type',
    });
  });

  it('GET /api/events/:id/pending-applicants should retrieve all the pending applicants', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const event = await createEvent(events[3]);
    event.ngo = ngo._id;
    await event.save();
    ngo.publishedEvents.push(event._id);
    await ngo.save();
    const response = await request(app)
      .get(`/api/events/${event._id}/pending-applicants`)
      .set('Cookie', ngoCookie)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body).toEqual({
      success: true,
      data: [],
    });
  });

  it('should not retrieve all the pending applicants if the event is not found', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const response = await request(app)
      .get(`/api/events/${events[3]._id}/pending-applicants`)
      .set('Cookie', ngoCookie)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No event found',
      success: false,
    });
  });
});

describe('Testing events for routes require auth controls', () => {
  it('GET /api/events/:id/pending-applicants/:userid/approve  should accept the volunteer application and add it to the approved applicants', async () => {
    const event = await createEvent(events[0]);
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    const volunteer = await createVolunteer();
    await Ngo.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(ngo._id) },

      { $push: { publishedEvents: event._id } }
    );
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(event._id) },

      { ngo: ngo._id, $push: { pendingApplicants: volunteer._id } }
    );
    const response = await request(app)
      .post(
        `/api/events/${event._id}/pending-applicants/${volunteer._id}/approve`
      )
      .set('Cookie', ngoCookie)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(
      response.body.data.pendingApplicants.includes(volunteer._id.toString())
    ).toBe(false);
    expect(
      response.body.data.approvedApplicants.includes(volunteer._id.toString())
    ).toBe(true);
    expect(response.body.data.avatar).toEqual(event.avatar);
    expect(response.body.data.description).toEqual(event.description);
    expect(response.body.data.location).toEqual(event.location);
    expect(new Date(response.body.data.launchDate)).toEqual(event.launchDate);
    expect(response.body.data.ngo).toEqual(ngo._id.toString());
    expect(typeof response.body.data).toBe('object');
  });
  it('GET /api/events/:id/pending-applicants/:userid/approve should not allow ngos to approve applicants if they are not the event owner', async () => {
    const event = await createEvent(events[0]);
    const ngo1 = await createNgo();
    const ngo2 = await Ngo.create({
      username: 'JohnyDoe',
      password: 'Pass123',
      email: 'johny.doe@gmail.com',
      type: 'Ngo',
    });
    const ngoCookie = createToken(ngo2);
    const volunteer = await createVolunteer();
    await Ngo.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(ngo1._id) },

      { $push: { publishedEvents: event._id } }
    );
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(event._id) },

      { ngo: ngo1._id, $push: { pendingApplicants: volunteer._id } }
    );
    const response = await request(app)
      .post(
        `/api/events/${event._id}/pending-applicants/${volunteer._id}/approve`
      )
      .set('Cookie', ngoCookie)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      error: 'you can only approve or decline applicants of your event',
    });
  });
  it('GET /api/events/:id/pending-applicants/:userid/approve should not allow ngos to approve applicants if they did not apply for the event', async () => {
    const event = await createEvent(events[0]);
    const ngo1 = await createNgo();
    const ngoCookie = createToken(ngo1);
    const volunteer = await createVolunteer();
    await Ngo.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(ngo1._id) },

      { $push: { publishedEvents: event._id } }
    );
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(event._id) },

      { ngo: ngo1._id }
    );
    const response = await request(app)
      .post(
        `/api/events/${event._id}/pending-applicants/${volunteer._id}/approve`
      )
      .set('Cookie', ngoCookie)
      .expect('Content-Type', /json/)
      .expect(400);
    expect(response.body).toEqual({
      success: false,
      error: 'This Volunteer did not apply for this event',
    });
  });

  it('PATCH /events/:id should update the event', async () => {
    const ngo = await createNgo();
    const ngoCookie = createToken(ngo);
    events[0].ngo = ngo._id;
    const event = await createEvent(events[0]);
    ngo.publishedEvents.push(event._id);
    await ngo.save();
    const response = await request(app)
      .patch(`/api/events/${event._id}`)
      .set('Cookie', ngoCookie)
      .send(events[1]);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.avatar).toEqual(events[1].avatar);
    expect(response.body.data.description).toEqual(events[1].description);
    expect(response.body.data.location).toEqual(events[1].location);
    expect(new Date(response.body.data.launchDate)).toEqual(
      events[1].launchDate
    );
    expect(response.body.data.tags).toEqual(events[1].tags);
  });
});
