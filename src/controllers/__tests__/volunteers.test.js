const request = require('supertest');
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
    launchDate: '2022-12-28T21:00:00.000Z',
    ngoId: '62e9008803b4427103cb4462',
    topic: 'Coding',
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
  },
];

const volunteers = [
  {
    _id: '1',
    firstName: 'Dilara',
    lastName: 'Fırtına',
    email: 'dilara_firtina@hotmail.com',
    appliedEvents: ['1'],
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("Testing volunteers for routes doesn't require auth controls", () => {
  it('GET /api/volunteers/:id/applied-events should retrieve all the applied events of specified volunteer', (done) => {
    request(app)
      .get(`/api/volunteers/1/applied-events`)
      .send(volunteers[0])
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        if (!res.body) {
          expect(res.statusCode).toBe(404);
          done();
          return res.json('No volunteer found');
        }
        expect(res.body.data).toEqual([]);
        expect(res.body.data.appliedEvents).toBe(events[0]._id);
        expect(Array.isArray(res.body.data)).toBe(true);
        done();
        return volunteers[0];
      });
  });
});
