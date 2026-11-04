const assert = require('node:assert/strict');
const test = require('node:test');
const { CreateAppointment } = require('../../src/application/use-cases/CreateAppointment.js');
const { DeleteAppointment } = require('../../src/application/use-cases/DeleteAppointment.js');
const { GetAppointment } = require('../../src/application/use-cases/GetAppointment.js');
const { ListAppointments } = require('../../src/application/use-cases/ListAppointments.js');
const { UpdateAppointment } = require('../../src/application/use-cases/UpdateAppointment.js');
const { Appointment } = require('../../src/domain/Appointment.js');

const clock = () => new Date('2026-06-01T17:00:00.000Z');
const input = {
  clientName: 'Ada Lovelace',
  service: 'Consultation',
  appointmentDate: '2026-06-01',
  appointmentTime: '14:00',
};

function createRepository(seed = []) {
  const appointments = new Map(seed.map((appointment) => [appointment.id, appointment]));

  return {
    appointments,
    async findById(id) {
      return appointments.get(id) ?? null;
    },
    async findAll() {
      return [...appointments.values()];
    },
    async findBySlot(date, time, excludeId) {
      return (
        [...appointments.values()].find(
          (appointment) =>
            appointment.appointmentDate === date &&
            appointment.appointmentTime === time &&
            appointment.id !== excludeId,
        ) ?? null
      );
    },
    async create(appointment) {
      appointments.set(appointment.id, appointment);
      return appointment;
    },
    async update(appointment) {
      appointments.set(appointment.id, appointment);
      return appointment;
    },
    async delete(id) {
      return appointments.delete(id);
    },
  };
}

test('create use case persists a valid appointment', async () => {
  const appointmentRepository = createRepository();
  const createAppointment = new CreateAppointment({ appointmentRepository, clock });

  const appointment = await createAppointment.execute(input);

  assert.equal(appointmentRepository.appointments.get(appointment.id), appointment);
  assert.equal(appointment.appointmentDate, input.appointmentDate);
});

test('get and list use cases return stored appointments', async () => {
  const historical = new Appointment({
    ...input,
    appointmentDate: '2020-06-01',
    id: '9272e45a-42af-43d2-8e2d-69507d8d0d5e',
    createdAt: '2020-05-01T12:00:00.000Z',
    updatedAt: '2020-05-01T12:00:00.000Z',
  });
  const appointmentRepository = createRepository([historical]);
  const getAppointment = new GetAppointment({ appointmentRepository });
  const listAppointments = new ListAppointments({ appointmentRepository });

  assert.equal(await getAppointment.execute(historical.id), historical);
  assert.deepEqual(await listAppointments.execute(), [historical]);
});

test('update use case preserves appointment identity and persists changes', async () => {
  const appointmentRepository = createRepository();
  const original = new Appointment(input, { clock });
  appointmentRepository.appointments.set(original.id, original);
  const updateAppointment = new UpdateAppointment({ appointmentRepository, clock });

  const updated = await updateAppointment.execute(original.id, { clientName: 'Grace Hopper' });

  assert.equal(updated.id, original.id);
  assert.equal(updated.createdAt, original.createdAt);
  assert.equal(updated.clientName, 'Grace Hopper');
  assert.equal(appointmentRepository.appointments.get(original.id), updated);
});

test('delete use case permanently removes a historical appointment', async () => {
  const historical = new Appointment({
    ...input,
    appointmentDate: '2020-06-01',
    id: '9272e45a-42af-43d2-8e2d-69507d8d0d5e',
    createdAt: '2020-05-01T12:00:00.000Z',
    updatedAt: '2020-05-01T12:00:00.000Z',
  });
  const appointmentRepository = createRepository([historical]);
  const deleteAppointment = new DeleteAppointment({ appointmentRepository });

  assert.equal(await deleteAppointment.execute(historical.id), historical);
  assert.equal(appointmentRepository.appointments.has(historical.id), false);
});

test('create and update use cases reject appointments in the past', async () => {
  const appointmentRepository = createRepository();
  const createAppointment = new CreateAppointment({ appointmentRepository, clock });
  const original = new Appointment(
    { ...input, appointmentDate: '2026-06-02', appointmentTime: '14:00' },
    { clock },
  );
  appointmentRepository.appointments.set(original.id, original);
  const updateAppointment = new UpdateAppointment({ appointmentRepository, clock });

  await assert.rejects(createAppointment.execute({ ...input, appointmentTime: '13:59' }), {
    name: 'ValidationError',
    field: 'appointmentDate',
  });
  await assert.rejects(
    updateAppointment.execute(original.id, {
      appointmentDate: '2026-06-01',
      appointmentTime: '13:59',
    }),
    { name: 'ValidationError', field: 'appointmentDate' },
  );
  assert.equal(appointmentRepository.appointments.size, 1);
});

test('update allows an appointment to keep its own slot', async () => {
  const appointmentRepository = createRepository();
  const original = new Appointment(
    { ...input, appointmentDate: '2026-06-02', appointmentTime: '14:00' },
    { clock },
  );
  appointmentRepository.appointments.set(original.id, original);
  const updateAppointment = new UpdateAppointment({ appointmentRepository, clock });

  const updated = await updateAppointment.execute(original.id, { clientName: 'Grace Hopper' });

  assert.equal(updated.appointmentDate, original.appointmentDate);
  assert.equal(updated.appointmentTime, original.appointmentTime);
});

test('create and update reject slots held by another appointment', async () => {
  const appointmentRepository = createRepository();
  const existing = new Appointment(
    { ...input, appointmentDate: '2026-06-02', appointmentTime: '14:00' },
    { clock },
  );
  const editable = new Appointment(
    { ...input, appointmentDate: '2026-06-03', appointmentTime: '14:00' },
    { clock },
  );
  appointmentRepository.appointments.set(existing.id, existing);
  appointmentRepository.appointments.set(editable.id, editable);
  const createAppointment = new CreateAppointment({ appointmentRepository, clock });
  const updateAppointment = new UpdateAppointment({ appointmentRepository, clock });
  const error = {
    name: 'AppointmentConflictError',
    appointmentDate: existing.appointmentDate,
    appointmentTime: existing.appointmentTime,
  };

  await assert.rejects(
    createAppointment.execute({
      ...input,
      appointmentDate: existing.appointmentDate,
      appointmentTime: existing.appointmentTime,
    }),
    error,
  );
  await assert.rejects(
    updateAppointment.execute(editable.id, {
      appointmentDate: existing.appointmentDate,
      appointmentTime: existing.appointmentTime,
    }),
    error,
  );
});

test('update and delete report records removed after their initial lookup', async () => {
  const appointment = new Appointment({ ...input, appointmentDate: '2026-06-02' }, { clock });
  const appointmentRepository = createRepository([appointment]);
  appointmentRepository.update = async () => null;
  appointmentRepository.delete = async () => false;
  const updateAppointment = new UpdateAppointment({ appointmentRepository, clock });
  const deleteAppointment = new DeleteAppointment({ appointmentRepository });

  await assert.rejects(updateAppointment.execute(appointment.id, { clientName: 'Grace Hopper' }), {
    name: 'AppointmentNotFoundError',
  });
  await assert.rejects(deleteAppointment.execute(appointment.id), {
    name: 'AppointmentNotFoundError',
  });
});
