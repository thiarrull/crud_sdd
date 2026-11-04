const assert = require('node:assert/strict');
const request = require('supertest');
const test = require('node:test');
const { once } = require('node:events');
const { createComposition } = require('../../src/main/compositionRoot.js');
const { startServer } = require('../../src/main/server.js');

const clock = () => new Date('2026-06-01T17:00:00.000Z');

test('composition root builds an in-memory application with rendered routes', async (context) => {
  const { app, database } = createComposition({ databasePath: ':memory:', clock });
  context.after(() => database.close());

  const response = await request(app).get('/appointments');

  assert.equal(response.status, 200);
  assert.match(response.text, /Nenhum agendamento cadastrado/);
});

test('server starts on an ephemeral port and serves the application', async () => {
  const { server } = startServer({ port: 0, databasePath: ':memory:', clock });
  await once(server, 'listening');

  try {
    const response = await request(server).get('/');
    assert.equal(response.status, 200);
    assert.match(response.text, /Agendamentos/);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

test('server rejects invalid port configuration', () => {
  const { parsePort } = require('../../src/main/server.js');

  assert.throws(() => parsePort('invalid'), {
    name: 'TypeError',
    message: 'PORT must be an integer between 0 and 65535.',
  });
});
