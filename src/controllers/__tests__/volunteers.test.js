const request = require('supertest');
const app = require('../../app');

jest.setTimeout(10000);

const volunteers = [
  {
    _id: '1',
    firstName: 'sobi',
    lastName: 'shams',
    email: 'sobhanshams1471@hotmail.com',
    password: 'volunteer passward',
    phone: '058899999',
    cv: 'volunteer cv',
    location: 'location',
    description: 'description',
    areaOfExp: 'newarea',
    type: 'Volunteer',
    providerId: 'volunteer ID',
  },
  {
    _id: '2',
    firstName: 'hamed',
    lastName: 'loi',
    email: 'hamedloi1234@hotmail.com',
    password: 'volunteer passward',
    phone: '059897676',
    cv: 'volunteer cv',
    location: 'location',
    description: 'description',
    areaOfExp: 'newarea',
    type: 'Volunteer',
    providerId: 'volunteer ID',
  },
];

beforeAll((done) => {
  done();
});

afterAll((done) => {
  done();
});

describe("Testing volunteers for routes doesn't require auth controls", () => {
  it('GET /api/volunteers should retrieve all the volunteers', (done) => {
    request(app)
      .get(`/api/volunteers/`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }

        expect(res.body.data).toEqual([]);
        expect(Array.isArray(res.body.data)).toBe(true);
        done();
        return volunteers;
      });
  });
});

describe("Testing volunteer for routes doesn't require auth controls", () => {
  it('GET /api/volunteers/:id should retrieve one volunteer that match the requested id', (done) => {
    request(app)
      .get(`/api/volunteers/${volunteers[2]._id}`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(volunteers[2].name);
        done();
      });
  });
});
