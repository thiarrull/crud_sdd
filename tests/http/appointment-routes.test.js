const assert = require('node:assert/strict');
const express = require('express');
const path = require('node:path');
const request = require('supertest');
const test = require('node:test');
const { CreateAppointment } = require('../../src/application/use-cases/CreateAppointment.js');
const { DeleteAppointment } = require('../../src/application/use-cases/DeleteAppointment.js');
const { GetAppointment } = require('../../src/application/use-cases/GetAppointment.js');
const { ListAppointments } = require('../../src/application/use-cases/ListAppointments.js');
const { UpdateAppointment } = require('../../src/application/use-cases/UpdateAppointment.js');
const {
  AppointmentController,
} = require('../../src/presentation/controllers/AppointmentController.js');
const { errorHandler } = require('../../src/presentation/middlewares/errorHandler.js');
const { createAppointmentRoutes } = require('../../src/presentation/routes/appointmentRoutes.js');

const clock = () => new Date('2026-06-01T17:00:00.000Z');
const validInput = {
  clientName: 'Ada Lovelace',
  service: 'Consultation',
  appointmentDate: '2026-06-02',
  appointmentTime: '14:00',
};

function createTestApplication(appointmentRepository) {
  const controller = new AppointmentController({
    createAppointment: new CreateAppointment({ appointmentRepository, clock }),
    getAppointment: new GetAppointment({ appointmentRepository }),
    listAppointments: new ListAppointments({ appointmentRepository }),
    updateAppointment: new UpdateAppointment({ appointmentRepository, clock }),
    deleteAppointment: new DeleteAppointment({ appointmentRepository }),
  });
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../../src/presentation/views'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../../src/presentation/public')));
  app.use(createAppointmentRoutes(controller));
  app.use(errorHandler);

  return app;
}

function createRepository() {
  const appointments = new Map();
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

test('all appointment routes support list, create, view, update, and permanent delete', async () => {
  const app = createTestApplication(createRepository());
  const listRoot = await request(app).get('/');
  const listAppointments = await request(app).get('/appointments');
  const createForm = await request(app).get('/appointments/new');
  const styles = await request(app).get('/styles.css');
  const created = await request(app).post('/appointments').type('form').send(validInput);

  assert.equal(listRoot.status, 200);
  assert.equal(listAppointments.status, 200);
  assert.equal(createForm.status, 200);
  assert.equal(styles.status, 200);
  assert.match(styles.headers['content-type'], /text\/css/);
  assert.match(createForm.text, /<form action="\/appointments" method="post"/);
  assert.match(createForm.text, /name="clientName"[^>]*required/);
  assert.match(createForm.text, /name="appointmentDate"[^>]*required/);
  assert.match(createForm.text, /name="appointmentTime"[^>]*required/);
  assert.match(createForm.text, /name="notes"[^>]*maxlength="500"/);
  assert.equal(created.status, 303);

  const appointmentUrl = created.headers.location;
  const details = await request(app).get(appointmentUrl);
  const editForm = await request(app).get(`${appointmentUrl}/edit`);
  const updated = await request(app)
    .post(`${appointmentUrl}/update`)
    .type('form')
    .send({ ...validInput, clientName: 'Grace Hopper' });

  assert.equal(details.status, 200);
  assert.match(details.text, /Ada Lovelace/);
  assert.equal(editForm.status, 200);
  assert.match(editForm.text, /action="\/appointments\/[^"]+\/update"/);
  assert.match(editForm.text, /value="Ada Lovelace"/);
  assert.equal(updated.status, 303);
  const updatedDetails = await request(app).get(appointmentUrl);
  assert.match(updatedDetails.text, /Grace Hopper/);
  const listAfterCreate = await request(app).get('/appointments');
  assert.match(listAfterCreate.text, /Grace Hopper/);

  const deleted = await request(app).post(`${appointmentUrl}/delete`);
  const missing = await request(app).get(appointmentUrl);

  assert.equal(deleted.status, 303);
  assert.equal(deleted.headers.location, '/appointments');
  assert.equal(missing.status, 404);
});

test('maps validation, not-found, conflict, and unexpected errors to 400, 404, 409, and 500', async () => {
  const repository = createRepository();
  const app = createTestApplication(repository);
  const invalid = await request(app)
    .post('/appointments')
    .type('form')
    .send({ ...validInput, clientName: '  ' });
  const notFound = await request(app).get('/appointments/missing-id');

  await request(app).post('/appointments').type('form').send(validInput);
  const conflict = await request(app).post('/appointments').type('form').send(validInput);

  const failingApp = createTestApplication({
    ...createRepository(),
    async findAll() {
      throw new Error('test failure');
    },
  });
  const originalConsoleError = console.error;
  console.error = () => {};
  let unexpected;
  try {
    unexpected = await request(failingApp).get('/appointments');
  } finally {
    console.error = originalConsoleError;
  }

  assert.equal(invalid.status, 400);
  assert.equal(notFound.status, 404);
  assert.equal(conflict.status, 409);
  assert.equal(unexpected.status, 500);
  assert.match(unexpected.text, /An unexpected error occurred\./);
});
