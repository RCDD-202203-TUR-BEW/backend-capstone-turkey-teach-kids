const request = require('supertest');
const app = require('../../app');

jest.setTimeout(10000);

const user1 = {
  _id :'1',
  name: 'JohnDoe',
  email: 'john.doe@gmail.com',
  type: 'ngo',
};

const user2 = {
  _id :'2',
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

const ngos = [
  {
    _id: '1',
    name: 'abc',
    website: 'abc.com',
    email: 'info@abc.com',
    phone: '055646565564'
  }
];

const volunteers = [
  {
    _id: '1',
    firstName: 'Dilara',
    lastName: 'Fırtına',
    email: 'dilara_firtina@hotmail.com'       
  }
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("Testing events for routes doesn't require auth controls", () => {
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
});