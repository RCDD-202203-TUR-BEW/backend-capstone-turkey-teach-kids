const request = require('supertest');
const Volunteer = require('../../models/volunteer');
const Ngo = require('../../models/ngo');
const app = require('../../app');

const user1 = {
  email: 'user1@hotmail.com',
  username: 'user1',
  password: 'Aa12345678',
  password2: 'Aa12345678',
};

const user2 = {
  email: 'user2@hotmail.com',
  username: 'user2',
  password: 'Aa12345678',
  password2: 'Aa12345678',
};

const wrongUser = {
  email: 'wrongmail@hotmail.com',
  username: 'wronguser',
  password: 'Aa12345678',
  password2: 'Aa12345678',
};

describe('POST /auth', () => {
  afterAll(async () => {
    await Volunteer.deleteMany();
    await Ngo.deleteMany();
  });

  it('should successfully signup a volunteer', async () => {
    const response = await request(app)
      .post('/api/auth/signup/volunteer')
      .send(user1);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('username');
    expect(response.body.data).toHaveProperty('password');
  });

  it('should successfully signup an ngo', async () => {
    const response = await request(app)
      .post('/api/auth/signup/ngo')
      .send(user2);
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('password');
    expect(response.body.data).toHaveProperty('username');
  });

  it('should return an error if the email is already taken', async () => {
    const response = await request(app)
      .post('/api/auth/signup/volunteer')
      .send(user1);
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('User already exists');
  });

  it('should login a user successfully', async () => {
    const response = await request(app).post('/api/auth/login').send(user1);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('email');
    expect(response.body.data).toHaveProperty('username');
    expect(response.body.data).toHaveProperty('password');
  });

  it('should return an error if the email is not found', async () => {
    const response = await request(app).post('/api/auth/login').send(wrongUser);
    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe('User not found');
  });
});
