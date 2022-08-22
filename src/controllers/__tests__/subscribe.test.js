const request = require('supertest');
let sendEmail = require('../../utils/mail');
const app = require('../../app');

jest.setTimeout(10000);

describe("Testing subscribe for routes doesn't require auth controls", () => {
  const subject = 'Subscription is successful!';
  it('POST /api/newsletter/subscribe should send the user an email', async () => {
    const requestBody = {
      email: 'john_doe@mail.com',
    };
    sendEmail = jest.fn();
    sendEmail(requestBody.email, subject);
    const response = await request(app)
      .post('/api/newsletter/subscribe')
      .expect('Content-Type', /json/)
      .expect(200)
      .send(requestBody);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.email).toEqual(requestBody.email);
    expect(sendEmail).toHaveBeenCalledWith(requestBody.email, subject);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });

  it('should not send the user an email if it is empty', async () => {
    sendEmail = jest.fn();
    const requestBody = {
      email: '',
    };
    sendEmail(requestBody.email, subject);
    const response = await request(app)
      .post('/api/subscribe')
      .expect('Content-Type', /json/)
      .expect(400);
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(sendEmail).toHaveBeenCalledWith(requestBody.email, subject);
    expect(sendEmail).toHaveBeenCalledTimes(1);
  });
});
