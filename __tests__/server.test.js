'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const { sequelize } = require('../src/auth/models');

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the express server bad methods/routes', () => {
  test('Should respond with a 404 on a bad route', async () => {
    const response = await request.post('/sign');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({});
  });

  test('Should respond with a 404 on a bad method', async () => {
    const response = await request.patch('/signup');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({});
  });
});

describe('Testing the POST requests', () => {
  test('Should respond with a 200 when a post request comes in for adding a new login', async () => {
    const response = await request.post('/signup').send({username:'jeans', password:'test'});
    expect(response.status).toEqual(200);
  });

  test('Should respond with a 200 when a post request comes in for signing in with existing login', async () => {
    const response = await request.post('/signin').auth('jeans', 'test');
    expect(response.status).toEqual(200);
  });
});