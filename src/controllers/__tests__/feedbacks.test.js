const mongoose = require('mongoose');
const request = require('supertest');
const Feedback = require('../../models/feedback');
let sendEmail = require('../../utils/mail');
const app = require('../../app');

jest.setTimeout(10000);

const contactLoad = {
  fullName: 'Dilara Fırtına',
  email: 'firtina.d@gmail.com',
  message: 'This is my message This is my message ',
};

beforeEach(async () => {
  await Feedback.deleteMany();
});
afterEach(async () => {
  await Feedback.deleteMany();
});
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testing feedbacks for routes doesn't require auth controls", () => {
  const subject = 'We received your contact request!';
  it('POST /api/feedbacks should add a new contact request', async () => {
    const newContactRequest = await Feedback.create(contactLoad);
    const response = await request(app)
      .post('/api/feedbacks')
      .send(contactLoad);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.fullName).toEqual(newContactRequest.fullName);
    expect(response.body.data.email).toEqual(newContactRequest.email);
    expect(response.body.data.message).toEqual(newContactRequest.message);
  });
  it('POST /api/feedbacks should send the user an email', async () => {
    sendEmail = jest.fn();
    sendEmail(contactLoad.email, subject);
    const response = await request(app)
      .post('/api/feedbacks')
      .send(contactLoad)
      .expect('Content-Type', /json/);
    console.log(response);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.fullName).toEqual(contactLoad.fullName);
    expect(response.body.data.email).toEqual(contactLoad.email);
    expect(response.body.data.message).toEqual(contactLoad.message);
    expect(sendEmail).toHaveBeenCalledWith(contactLoad.email, subject);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it('should not send the user an email if it is empty', async () => {
    sendEmail = jest.fn();
    const newContactRequest = {
      email: '',
    };
    sendEmail(newContactRequest.email, subject);
    const response = await request(app)
      .post('/api/feedbacks')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(sendEmail).toHaveBeenCalledWith(newContactRequest.email, subject);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });
});
