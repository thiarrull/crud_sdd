const assert = require('node:assert/strict');
const test = require('node:test');
const {
  AppointmentConflictError,
} = require('../../src/application/errors/AppointmentConflictError.js');
const { Appointment } = require('../../src/domain/Appointment.js');
const { createDatabase } = require('../../src/infrastructure/database/database.js');
const {
  SQLiteAppointmentRepository,
} = require('../../src/infrastructure/repositories/SQLiteAppointmentRepository.js');

const clock = () => new Date('2026-06-01T17:00:00.000Z');

function makeAppointment(overrides = {}) {
  return new Appointment(
    {
      clientName: 'Ada Lovelace',
      service: 'Consultation',
      appointmentDate: '2026-06-02',
      appointmentTime: '14:00',
      ...overrides,
    },
    { clock },
  );
}

function setup(context) {
  const database = createDatabase(':memory:');
  context.after(() => database.close());
  return new SQLiteAppointmentRepository(database);
}

test('persists and reads appointment fields and metadata', async (context) => {
  const repository = setup(context);
  const appointment = makeAppointment();

  await repository.create(appointment);

  assert.deepEqual(await repository.findById(appointment.id), appointment);
  assert.deepEqual(await repository.findAll(), [appointment]);
});

test('findBySlot excludes the appointment being edited', async (context) => {
  const repository = setup(context);
  const appointment = makeAppointment();
  await repository.create(appointment);

  assert.equal(
    await repository.findBySlot(
      appointment.appointmentDate,
      appointment.appointmentTime,
      appointment.id,
    ),
    null,
  );
  assert.deepEqual(
    await repository.findBySlot(appointment.appointmentDate, appointment.appointmentTime),
    appointment,
  );
});

test('create translates a duplicate slot into an appointment conflict', async (context) => {
  const repository = setup(context);
  const appointment = makeAppointment();
  await repository.create(appointment);

  await assert.rejects(
    repository.create(makeAppointment()),
    (error) => error instanceof AppointmentConflictError,
  );
});

test('update preserves identity and creation time while allowing its own slot', async (context) => {
  const repository = setup(context);
  const original = makeAppointment();
  await repository.create(original);
  const updatedAt = '2026-06-01T18:00:00.000Z';
  const updated = original.update(
    { clientName: 'Grace Hopper' },
    { clock: () => new Date(updatedAt) },
  );

  assert.deepEqual(await repository.update(updated), updated);
  assert.equal((await repository.findById(original.id)).createdAt, original.createdAt);
  assert.equal((await repository.findById(original.id)).updatedAt, updatedAt);
});

test('update translates another appointment occupying the requested slot', async (context) => {
  const repository = setup(context);
  const first = makeAppointment();
  const second = makeAppointment({
    appointmentDate: '2026-06-03',
    id: '9272e45a-42af-43d2-8e2d-69507d8d0d5e',
  });
  await repository.create(first);
  await repository.create(second);

  await assert.rejects(
    repository.update(
      second.update({
        appointmentDate: first.appointmentDate,
        appointmentTime: first.appointmentTime,
      }),
    ),
    (error) => error instanceof AppointmentConflictError,
  );
});

test('permanently deletes appointments and retains historical reads', async (context) => {
  const repository = setup(context);
  const historical = makeAppointment({ appointmentDate: '2020-06-02' });
  await repository.create(historical);

  assert.deepEqual(await repository.findById(historical.id), historical);
  assert.equal(await repository.delete(historical.id), true);
  assert.equal(await repository.findById(historical.id), null);
});
