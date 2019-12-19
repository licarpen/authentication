require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app authentication routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  /* beforeEach(async() => {
    await User.create({ email: 'me@me.com', password: '123' });
  });
  */

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('signs up a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ email: 'me@me.com', password: '123' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          email: 'me@me.com',
          __v: 0
        });
      });
  });
  it('returns error for invalid email login', async() => {
    await User.create({ email: 'me@me.com', password: '123' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'me', password: '123' })
      .then(res => {
        expect(res.body).toEqual({ message: 'Invalid email/password', status: 401 });
      });
  });

  it('returns error for invalid password login', async() => {
    await User.create({ email: 'me@me.com', password: '123' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'me@me.com', password: 'abc' })
      .then(res => {
        expect(res.body).toEqual({ message: 'Invalid email/password', status: 401 });
      });
  });

  it('logs in a valid user', async() => {
    const user = await User.create({ email: 'me@me.com', password: '123' });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'me@me.com', password: '123' })
      .then(res => {
        expect(res.body).toEqual({ email: user.email, _id: user.id, __v: 0 });
      });
  });
});
