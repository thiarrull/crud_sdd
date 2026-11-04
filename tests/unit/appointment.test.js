const assert = require('node:assert/strict');
const test = require('node:test');
const { Appointment, assertNotInPast } = require('../../src/domain/Appointment.js');
const { ValidationError } = require('../../src/domain/errors/ValidationError.js');

function validAppointment(overrides = {}) {
  return {
    clientName: '  Ada Lovelace  ',
    service: '  Consultation  ',
    appointmentDate: '2028-02-29',
    appointmentTime: '09:30',
    ...overrides,
  };
}

test('trims required text fields and accepts a valid appointment', () => {
  const appointment = new Appointment(validAppointment());

  assert.equal(appointment.clientName, 'Ada Lovelace');
  assert.equal(appointment.service, 'Consultation');
  assert.equal(appointment.appointmentDate, '2028-02-29');
  assert.equal(appointment.appointmentTime, '09:30');
  assert.equal(appointment.notes, null);
});

test('rejects missing or blank required values', () => {
  for (const [field, overrides] of [
    ['clientName', { clientName: '   ' }],
    ['clientName', { clientName: undefined }],
    ['service', { service: '   ' }],
    ['service', { service: undefined }],
    ['appointmentDate', { appointmentDate: undefined }],
    ['appointmentTime', { appointmentTime: undefined }],
  ]) {
    assert.throws(
      () => new Appointment(validAppointment(overrides)),
      (error) => {
        assert.ok(error instanceof ValidationError);
        assert.equal(error.field, field);
        return true;
      },
    );
  }
});

test('rejects malformed or impossible calendar dates', () => {
  for (const appointmentDate of [
    '2026-02-30',
    '2025-02-29',
    '2026-13-01',
    '01-01-2026',
    null,
    20260201,
  ]) {
    assert.throws(() => new Appointment(validAppointment({ appointmentDate })), {
      name: 'ValidationError',
      field: 'appointmentDate',
    });
  }
});

test('accepts leap days only in leap years', () => {
  assert.equal(
    new Appointment(validAppointment({ appointmentDate: '2024-02-29' })).appointmentDate,
    '2024-02-29',
  );
  assert.throws(() => new Appointment(validAppointment({ appointmentDate: '1900-02-29' })), {
    name: 'ValidationError',
    field: 'appointmentDate',
  });
});

test('rejects times outside the 24-hour HH:mm range', () => {
  for (const appointmentTime of ['24:05', '12:60', '9:30', '09:3', 'noon']) {
    assert.throws(() => new Appointment(validAppointment({ appointmentTime })), {
      name: 'ValidationError',
      field: 'appointmentTime',
    });
  }
});

test('accepts notes at the 500-character limit and rejects longer notes', () => {
  assert.equal(new Appointment(validAppointment({ notes: 'x'.repeat(500) })).notes.length, 500);
  assert.throws(() => new Appointment(validAppointment({ notes: 'x'.repeat(501) })), {
    name: 'ValidationError',
    field: 'notes',
  });
});

test('creates UUID identity and ISO 8601 timestamps using the injected clock', () => {
  const createdAt = '2026-05-01T13:00:00.000Z';
  const appointment = new Appointment(validAppointment(), {
    clock: () => new Date(createdAt),
  });

  assert.match(appointment.id, /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i);
  assert.equal(appointment.createdAt, createdAt);
  assert.equal(appointment.updatedAt, createdAt);
});

test('updates preserve UUID and createdAt while refreshing updatedAt', () => {
  const createdAt = '2026-05-01T13:00:00.000Z';
  const updatedAt = '2026-05-02T13:00:00.000Z';
  const appointment = new Appointment(validAppointment(), {
    clock: () => new Date(createdAt),
  });
  const updated = appointment.update(
    { clientName: 'Grace Hopper', id: 'not-a-uuid', createdAt: 'not-a-timestamp' },
    { clock: () => new Date(updatedAt) },
  );

  assert.equal(updated.id, appointment.id);
  assert.equal(updated.createdAt, createdAt);
  assert.equal(updated.updatedAt, updatedAt);
  assert.equal(updated.clientName, 'Grace Hopper');
});

test('rejects past appointment minutes using a fixed Sao Paulo clock', () => {
  const appointment = new Appointment(
    validAppointment({
      appointmentDate: '2026-06-01',
      appointmentTime: '13:59',
    }),
  );

  assert.throws(() => assertNotInPast(appointment, () => new Date('2026-06-01T17:00:00.000Z')), {
    name: 'ValidationError',
    field: 'appointmentDate',
  });
});

test('accepts the current minute and future appointments using a fixed clock', () => {
  const clock = () => new Date('2026-06-01T17:00:00.000Z');

  assert.doesNotThrow(() =>
    assertNotInPast(
      new Appointment(
        validAppointment({ appointmentDate: '2026-06-01', appointmentTime: '14:00' }),
      ),
      clock,
    ),
  );
  assert.doesNotThrow(() =>
    assertNotInPast(
      new Appointment(
        validAppointment({ appointmentDate: '2026-06-01', appointmentTime: '14:01' }),
      ),
      clock,
    ),
  );
});

test('converts the injected instant to Sao Paulo local date across midnight', () => {
  const clock = () => new Date('2026-06-02T02:59:00.000Z');

  assert.doesNotThrow(() =>
    assertNotInPast(
      new Appointment(
        validAppointment({ appointmentDate: '2026-06-02', appointmentTime: '00:01' }),
      ),
      clock,
    ),
  );
  assert.throws(
    () =>
      assertNotInPast(
        new Appointment(
          validAppointment({ appointmentDate: '2026-06-01', appointmentTime: '23:58' }),
        ),
        clock,
      ),
    { name: 'ValidationError', field: 'appointmentDate' },
  );
});
