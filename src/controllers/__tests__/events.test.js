const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

jest.setTimeout(10000);

const events = [
  {
    _id: '1',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'Antalya',
    launchDate: 'Thu Dec 29 2022',
    ngo: 'ObjectId(1)',
    topic: 'Coding',
  },
  {
    _id: '2',
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    location: 'İstanbul',
    launchDate: 'Thu Dec 1 2022',
    ngo: 'ObjectId(1)',
    topic: 'English',
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Testing events for routes doesn't require auth controls", () => {
  it('GET /api/events should retrieve all the events', (done) => {
    request(app)
      .get(`/api/events/`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          expect(res.statusCode).toBe(422);
          done();
          return err;
        }
        if (!res.body) {
          expect(res.statusCode).toBe(404);
          done();
          return res.json('No events found');
        }
        expect(res.body).toEqual([]);
        expect(Array.isArray(res.body)).toBe(true);
        done();
        return events;
      });
  });
});
