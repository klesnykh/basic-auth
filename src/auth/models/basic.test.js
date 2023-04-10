'use strict';

const server = require('../src/server');
const supertest = require('supertest');
const basicAuth = require('./middleware/basic');

// const request = {
//     headers: 
// }

const { sequelize } = require('../src/auth/models');

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('Testing the middleware with a basic header', () => {
  test('Should respond with a object', async () => {

  });
});