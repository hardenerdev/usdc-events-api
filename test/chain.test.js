require('dotenv').config({
  path: './.env.test'
});

const request = require('supertest');
const app = require('../src/app');

test('should get chain id', async () => {
  await request(app)
    .get('/chain/id')
    .expect(200);
});

test('should get current block number', async () => {
  await request(app)
    .get('/chain/blocknumber')
    .expect(200);
});
