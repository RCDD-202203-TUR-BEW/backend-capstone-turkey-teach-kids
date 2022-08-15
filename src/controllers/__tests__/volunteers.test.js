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

describe("Testing volunteer for routes doesn't require auth controls", () => {
  it('GET /api/volunteers/:id should retrieve one volunteer that match the requested id', (done) => {
    request(app)
      .get(`/api/volunteers/${volunteers[(0, 1)]._id}`)
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          done();
          return err;
        }
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(volunteers[(0, 1)].name);
        done();
      });
  });
});
it('Get volunteer record which does not exists', (done) => {
  const expectedResponse = { message: 'No volunteer found with given ID' };
  request(app)
    .get(`/api/vounteers/66}`)
    .expect(400)
    .end((err, res) => {
      expect(res.body).toEqual(expectedResponse);
      done();
    });
});
