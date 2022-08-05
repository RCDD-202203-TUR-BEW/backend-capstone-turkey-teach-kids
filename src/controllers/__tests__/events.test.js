const request = require('supertest');
const app = require('../../app');

jest.setTimeout(10000);

const user1 = {
  id: '1',
  name: 'JohnDoe',
  email: 'john.doe@gmail.com',
  type: 'ngo',
};

const user2 = {
  id: '2',
  name: 'JaneDoe',
  email: 'jane.doe@gmail.com',
  type: 'volunteer',
};

const events = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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

const ngos = [
  {
    id: '1',
    name: 'abc',
    website: 'abc.com',
    email: 'info@abc.com',
    phone: '055646565564',
  },
];

const volunteers = [
  {
    id: '1',
    firstName: 'Dilara',
    lastName: 'Fırtına',
    email: 'dilara_firtina@hotmail.com',
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe('Testing events for routes require auth controls', () => {
  test('POST /api/events should create a new event and return it in the response', (done) => {
    const req = {
      user: {
        id: user1.id,
      },
    };
    request(app)
      .post('/api/events')
      .set('Content-Type', 'application/json')
      .send(events[0])
      .expect('Content-Type', /json/)
      .expect(201, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(req.user.id).toBe(ngos.id);
        expect(res.body.data.avatar).toEqual(events[0].avatar);
        expect(res.body.data.description).toEqual(events[0].description);
        expect(res.body.data.location).toEqual(events[0].location);
        expect(res.body.data.launchDate).toEqual(events[0].launchDate);
        expect(res.body.data.ngoId).toEqual(events[0].ngo);
        expect(res.body.data.topic).toEqual(events[0].topic);
        done();
        return events[0];
      });
  });

  test('POST /api/events/ should refuse to add event without authentication', (done) => {
    const req = {};
    request(app)
      .post('/api/events/')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect({
        message: 'You need to sign in to add an event',
      })
      .expect(403, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(req.user.id).not.toBe(ngos.id);
        done();
        return events[0];
      });
    done();
  });

  test('POST /api/events/ should refuse to add event without authorization', (done) => {
    const req = {
      user: {
        id: user2.id,
      },
    };
    request(app)
      .post('/api/events/')
      .expect(403)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect({
        message: 'You are not authorized to delete this event',
      });
    done();
  });
});
