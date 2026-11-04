const assert = require('node:assert/strict');
const test = require('node:test');
const { createDatabase } = require('../../src/infrastructure/database/database.js');

test('creates the appointments schema and enforces unique date-time slots', (context) => {
  const database = createDatabase(':memory:');
  context.after(() => database.close());

  const columns = database.pragma('table_info(appointments)').map((column) => column.name);
  assert.deepEqual(columns, [
    'id',
    'client_name',
    'service',
    'appointment_date',
    'appointment_time',
    'notes',
    'created_at',
    'updated_at',
  ]);

  const insert = database.prepare(`
    INSERT INTO appointments (
      id, client_name, service, appointment_date, appointment_time, notes, created_at, updated_at
    ) VALUES (
      @id, @clientName, @service, @date, @time, @notes, @createdAt, @updatedAt
    )
  `);
  const firstAppointment = {
    id: 'appointment-1',
    clientName: 'Client One',
    service: 'Consultation',
    date: '2030-01-01',
    time: '10:00',
    notes: null,
    createdAt: '2029-01-01T00:00:00.000Z',
    updatedAt: '2029-01-01T00:00:00.000Z',
  };

  insert.run(firstAppointment);
  assert.throws(() => insert.run({ ...firstAppointment, id: 'appointment-2' }), {
    code: 'SQLITE_CONSTRAINT_UNIQUE',
  });
});
