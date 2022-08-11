const request = require('supertest');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
const app = require('../../app');

const volunteer = {
  _id: '5e9f8f8f8f8f8f8f8f8f8f8f',
  email: 'volunteer@hotmail.com',
  username: 'anyuser',
  password: 'Aa12345678',
  areaOfExp: 'anyarea',
  cv: 'anycv',
  description: 'anydescription',
  firstName: 'anyfirstname',
  lastName: 'anylastname',
  location: 'anylocation',
  phone: '5444444444',
  type: 'Volunteer',
};

const updatedVolunteer = {
  email: 'newmail@hotmail.com',
  username: 'newusername',
  firstName: 'newfirstname',
  lastName: 'newlastname',
  phone: '5555555555',
  location: 'newlocation',
  description: 'newdescription',
  cv: 'newcv',
  areaOfExp: 'newarea',
  type: 'Volunteer',
};

const ngo = {
  _id: '5e9f8f8f8f8f8f8f8f8f8f88',
  name: 'anyname',
  email: 'ngo@hotmail.com',
  username: 'ngouser',
  password: 'Aa12345678',
  phone: '5543672',
  avatar: 'anyavatar',
  website: 'google.com',
  type: 'Ngo',
};

const updatedNgo = {
  name: 'newname',
  email: 'newmail@hotmail.com',
  username: 'newusername',
  phone: '5555555555',
  website: 'newwebsite',
  avatar: 'newavatar',
  type: 'Ngo',
};

const volunteerToken = jwt.sign(
  { _id: volunteer._id, type: 'Volunteer' },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h',
  }
);
const cookie = `token=${volunteerToken}`;

const ngoToken = jwt.sign({ _id: ngo._id }, process.env.JWT_SECRET, {
  expiresIn: '1h',
});
const ngoCookie = `token=${ngoToken}`;

const wrongToken = jwt.sign({ email: ngo.email }, 'SECR', {
  expiresIn: '1h',
});
const wrongCookie = `token=${wrongToken}`;

describe('profile', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });
  afterAll(async () => {
    await User.deleteMany();
  });
  it('should fetch a volunteer profile', async () => {
    const user = new User(volunteer);
    await user.save();
    const response = await request(app)
      .get('/api/profile')
      .set('Cookie', cookie);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
  });

  it('should fetch a ngo profile', async () => {
    const user = new User(ngo);
    await user.save();
    const response = await request(app)
      .get('/api/profile')
      .set('Cookie', ngoCookie);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
  });

  it('should update a volunteer profile accordingly', async () => {
    const user = new User(volunteer);
    await user.save();
    const response = await request(app)
      .patch('/api/profile')
      .set('Cookie', cookie)
      .send(updatedVolunteer);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
  });

  it('should update a ngo profile accordingly', async () => {
    const user = new User(ngo);
    await user.save();
    const response = await request(app)
      .patch('/api/profile')
      .set('Cookie', ngoCookie)
      .send(updatedNgo);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
  });

  it('should not be able to update a volunteer profile with invalid token', async () => {
    const user = new User(volunteer);
    await user.save();
    const response = await request(app)
      .patch('/api/profile')
      .set('Cookie', wrongCookie)
      .send(updatedVolunteer);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid/expired token');
  });

  it('should not be able to update a ngo profile with invalid token', async () => {
    const user = new User(ngo);
    await user.save();
    const response = await request(app)
      .patch('/api/profile')
      .set('Cookie', wrongCookie)
      .send(updatedNgo);
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('Invalid/expired token');
  });
});
