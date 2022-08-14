const request = require('supertest');
const app = require('../../app');
const Event = require('../../models/event');
const { User } = require('../../models/user');

jest.setTimeout(10000);

const user = {
  sub: '12345678',
  name: 'John Doe',
  given_name: 'John',
  family_name: 'Doe',
  picture: 'https://lh3.googleusercontent.com/a-/AOh1',
  email: 'john.doe@gmail.com',
  email_verified: true,
  locale: 'en-GB',
};

const user1 = {
  _id: '1',
  name: 'JohnDoe',
  email: 'john.doe@gmail.com',
  type: 'ngo',
};

const user2 = {
  _id: '2',
  name: 'JaneDoe',
  email: 'jane.doe@gmail.com',
  type: 'volunteer',
};

const events = [
  {
    _id: '1',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Antalya',
    launchDate: '2022-12-28T21:00:00.000Z',
    ngoId: '62e9008803b4427103cb4462',
    topic: 'Coding',
    pendingApplicants: ['1'],
  },
  {
    _id: '2',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'İstanbul',
    launchDate: '2022-12-28T21:00:00.000Z',
    ngoId: '62e9008803b4427103cb4462',
    topic: 'English',
    pendingApplicants: [],
  },
  {
    _id: '3',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Antalya',
    launchDate: '2022-12-28T21:00:00.000Z',
    ngoId: '62e9008803b4427103cb4462',
    topic: 'Coding',
    pendingApplicants: [],
  },
];

const event = {
  _id: '62e9008803b4427103cb4462',
  avatar:
    'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  location: 'Antalya',
  launchDate: '2022-12-28T21:00:00.000Z',
  ngoId: '62e9008803b4427103cb3462',
  topic: 'Coding',
  pendingApplicants: ['62e9004803b4427103cb4462'],
};

const ngos = [
  {
    _id: '1',
    name: 'abc',
    website: 'abc.com',
    email: 'info@abc.com',
    phone: '055646565564',
  },
];

const volunteers = [
  {
    _id: '1',
    firstName: 'Dilara',
    lastName: 'Fırtına',
    email: 'dilara_firtina@hotmail.com',
  },
  {
    _id: '62e9004803b4427103cb4462',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jojo@hotmail.com',
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("Testing events for routes doesn't require auth controls", () => {
  beforeEach(async () => {
    await Event.deleteMany();
  });
  it('GET /api/events should retrieve all the events', (done) => {
    request(app)
      .get(`/api/events/`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(Array.isArray(res.body.data)).toBe(true);
        done();
        return events;
      });
  });

  it('GET /api/events/:id should retrieve a single event', (done) => {
    request(app)
      .get('/api/events/1/')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        if (!res.body) {
          expect(res.statusCode).toBe(404);
          done();
          return res.json('No event found');
        }
        expect(res.body.data).toEqual(events[0]);
        expect(typeof res.body).toEqual('object');
        done();
        return events;
      });
  });

  it('GET /api/events/:id/related-events should retrieve all the related events', (done) => {
    request(app)
      .get(`/api/events/1/related-events`)
      .send(events[0])
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        if (!res.body) {
          expect(res.statusCode).toBe(404);
          done();
          return res.json('No event found');
        }
        expect(res.body.data).toEqual([]);
        expect(res.body.data.topic).toBe(events[0].topic);
        expect(Array.isArray(res.body.data)).toBe(true);
        done();
        return events;
      });
  });

  it('GET /api/events/:id/pending-applicants should retrieve all the pending applicants', async () => {
    const evento = new Event(event);
    await evento.save();
    const response = await request(app)
      .get(`/api/events/${event._id}/pending-applicants`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      data: ['62e9004803b4427103cb4462'],
      success: true,
    });
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('should not retrieve all the pending applicants if the event is not found', async () => {
    const response = await request(app)
      .get(`/api/events/${event._id}/pending-applicants`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body).toEqual({
      error: 'No event found',
      success: false,
    });
  });
});
