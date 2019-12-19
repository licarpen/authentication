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
});
