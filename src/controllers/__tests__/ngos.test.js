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
const events = [
  {
    avatar:
      'https://www.estidia.eu/wp-content/uploads/2018/04/free-png-upcoming-events-clipart-icons-for-calendar-of-events-800.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'sometitle',
    location: 'Antalya',
    launchDate: new Date(),
    ngo: '62e9008803b4427103cb4462',
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
    ngo: '62e9008803b4427103cb4462',
    pendingApplicants: [],
    tags: ['English', 'Bootcamp'],
  },
];
const ngoId = '62e9008803b4427103cb4462';

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
  });
  it('GET /api/ngos/:id/events should retrieve all the events that are published by the specified NGO', async () => {
    const ngo = await Ngo.create(mNgos[0]);

    const mEvent1 = await Event.create(events[0]);
    const mEvent2 = await Event.create(events[1]);

    await Ngo.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(ngo._id) },

      { $push: { publishedEvents: mEvent1._id } }
    );
    await Ngo.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(ngo._id) },

      { $push: { publishedEvents: mEvent2._id } }
    );
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(mEvent1._id) },

      { ngo: ngo._id }
    );
    await Event.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(mEvent2._id) },

      { ngo: ngo._id }
    );

    const response = await request(app)
      .get(`/api/ngos/${ngo._id}/events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.success).toEqual(true);

    const Events = await Event.find({ ngo: ngo._id });
    expect(response.body.data[0].avatar).toEqual(Events[0].avatar);
    expect(response.body.data[1].avatar).toEqual(Events[1].avatar);
    expect(response.body.data[0].tags[0]).toEqual(Events[0].tags[0]);
    expect(response.body.data[1].tags[0]).toEqual(Events[1].tags[0]);
    expect(response.body.data[0].description).toEqual(Events[0].description);
    expect(response.body.data[1].description).toEqual(Events[1].description);
    const responsefilterd = await request(app)
      .get(`/api/ngos/${ngo._id}/events?tag=${events[0].tags[1]}`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(responsefilterd.body.success).toEqual(true);
    const EventsFiltered = await Event.find({ ngo: ngo._id, tags: 'Bootcamp' });
    expect(responsefilterd.body.data[0].avatar).toEqual(
      EventsFiltered[0].avatar
    );
    expect(
      responsefilterd.body.data[0].tags.some((el) =>
        EventsFiltered[0].tags.includes(el)
      )
    ).toEqual(true);
    expect(responsefilterd.body.data[0].description).toEqual(
      EventsFiltered[0].description
    );
  });
  it('GET /api/ngos/:id/events should give error message if the Ngo was not found ', async () => {
    const response = await request(app)
      .get(`/api/ngos/${ngoId}/events`)
      .expect('Content-Type', /json/)
      .expect(404);
    expect(response.body.success).toEqual(false);

    expect(response.body).toEqual({
      error: 'This Id dose not match any registered NGO ',
      success: false,
    });
  });
  it('GET /api/ngos/:id/events should give an empty array if  the Ngo has not published and events ', async () => {
    const mNgo = await Ngo.create(mNgos[0]);
    const response = await request(app)
      .get(`/api/ngos/${mNgo._id}/events`)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({
      data: [],
      success: true,
    });
  });
});
