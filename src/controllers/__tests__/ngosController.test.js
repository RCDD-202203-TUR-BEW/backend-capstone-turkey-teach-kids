const mongoose = require('mongoose');
const request = require('supertest');
const Event = require('../../models/event');
const { Volunteer, Ngo } = require('../../models/user');
const app = require('../../app');

jest.setTimeout(5000);

const mNgos = [
  {
    username: 'SomeFancyUsername',
    email: 'info@ntt.edu.tr',
    password: 'some passward',
    type: 'Ngo',
  },
  {
    username: 'SomeFancyUsername2',
    email: 'info@nmn.edu.tr',
    password: 'some passward',
    type: 'Ngo',
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

describe("Testing Ngos for routes doesn't require auth controls", () => {
  it('GET /api/ngos should retrieve all the registered Ngos', async () => {
    const ngo1 = await Ngo.create(mNgos[0]);
    const ngo2 = await Ngo.create(mNgos[1]);
    const response = await request(app)
      .get(`/api/ngos`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data[0].username).toEqual(ngo1.username);
    expect(response.body.data[1].username).toEqual(ngo2.username);
    expect(response.body.data[0].email).toEqual(ngo1.email);
    expect(response.body.data[1].email).toEqual(ngo2.email);
    expect(response.body.data[0].type).toEqual('Ngo');
    expect(response.body.data[1].type).toEqual('Ngo');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
  it('GET /api/ngos/:id should retrieve single Ngo that match the requested id', async () => {
    const ngo = await Ngo.create(mNgos[0]);
    const response = await request(app)
      .get(`/api/ngos/${ngo._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.username).toEqual(ngo.username);
    expect(response.body.data.email).toEqual(ngo.email);
    expect(response.body.data.passward).toEqual(ngo.passward);
    expect(response.body.data.type).toEqual('Ngo');
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
