const request = require('supertest');
const app = require('../../app');

jest.setTimeout(5000);

const ngos = [
  {
    _id: '1',
    name: ' NTT Eduacation',
    username: 'Some Fancy Username',
    website: 'https://www.womefanctwebsite.org',
    email: 'info@ntt.edu.tr(1)',
    password: 'some passward',
    phone: '0212123456789',
    publishedEvents: ['objectId(1)', 'objectId(2)'],
    avatar: 'https://www.womefncyavatar.png',
  },
  {
    _id: '2',
    name: ' NMN Eduacation',
    username: 'Some Fancy Username',
    website: 'https://www.womefanctwebsite.org',
    email: 'info@nmn.edu.tr(1)',
    password: 'some passward',
    phone: '0216123456789',
    publishedEvents: ['objectId(2)', 'objectId(3)'],
    avatar: 'https://www.womefncyavatar.png',
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("Testing ngos for routes doesn't require auth controls", () => {
  it('GET /api/ngos should retrieve all the ngos', async (done) => {
    await request(app)
      .get(`/api/ngos/`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(res.body).toEqual([]);
        expect(Array.isArray(res.body)).toBe(true);
        done();
        return ngos;
      });
  });
});
