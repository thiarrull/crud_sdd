const { randomUUID } = require('node:crypto');
const { ValidationError } = require('./errors/ValidationError.js');

const uuidPattern = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
const isoTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function readClock(clock) {
  const now = clock();
  if (!(now instanceof Date) || !Number.isFinite(now.getTime())) {
    throw new TypeError('The clock must return a valid Date.');
  }

  return now;
}

function isIsoTimestamp(value) {
  if (typeof value !== 'string' || !isoTimestampPattern.test(value)) {
    return false;
  }

  const timestamp = new Date(value);
  return Number.isFinite(timestamp.getTime()) && timestamp.toISOString() === value;
}

function isRealDate(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (year === 0 || month < 1 || month > 12) {
    return false;
  }

  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysPerMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  return day >= 1 && day <= daysPerMonth[month - 1];
}

function requireTrimmed(value, field) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ValidationError(`${field} is required.`, field);
  }

  return value.trim();
}

function assertNotInPast(appointment, clock = () => new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(readClock(clock))
      .map(({ type, value }) => [type, value]),
  );
  const currentLocalMinute = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  const requestedLocalMinute = `${appointment.appointmentDate}T${appointment.appointmentTime}`;

  if (requestedLocalMinute < currentLocalMinute) {
    throw new ValidationError('An appointment cannot be scheduled in the past.', 'appointmentDate');
  }
}

class Appointment {
  constructor(input = {}, { clock = () => new Date() } = {}) {
    if (input === null || typeof input !== 'object' || Array.isArray(input)) {
      throw new ValidationError('Appointment data must be an object.');
    }

    const clientName = requireTrimmed(input.clientName, 'clientName');
    const service = requireTrimmed(input.service, 'service');

    if (!isRealDate(input.appointmentDate)) {
      throw new ValidationError(
        'appointmentDate must be a real date in YYYY-MM-DD format.',
        'appointmentDate',
      );
    }

    if (
      typeof input.appointmentTime !== 'string' ||
      !/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(input.appointmentTime)
    ) {
      throw new ValidationError('appointmentTime must be a valid HH:mm time.', 'appointmentTime');
    }

    const notes = input.notes ?? null;
    if (typeof notes !== 'string' && notes !== null) {
      throw new ValidationError('notes must be text.', 'notes');
    }
    if (notes !== null && notes.length > 500) {
      throw new ValidationError('notes must not exceed 500 characters.', 'notes');
    }

    const needsTimestamp =
      input.createdAt === undefined ||
      input.createdAt === null ||
      input.updatedAt === undefined ||
      input.updatedAt === null;
    const currentTimestamp = needsTimestamp ? readClock(clock).toISOString() : undefined;
    const id = input.id ?? randomUUID();
    const createdAt = input.createdAt ?? currentTimestamp;
    const updatedAt = input.updatedAt ?? currentTimestamp;

    if (typeof id !== 'string' || !uuidPattern.test(id)) {
      throw new ValidationError('id must be a UUID.', 'id');
    }
    if (!isIsoTimestamp(createdAt)) {
      throw new ValidationError('createdAt must be an ISO 8601 UTC timestamp.', 'createdAt');
    }
    if (!isIsoTimestamp(updatedAt)) {
      throw new ValidationError('updatedAt must be an ISO 8601 UTC timestamp.', 'updatedAt');
    }

    this.id = id;
    this.clientName = clientName;
    this.service = service;
    this.appointmentDate = input.appointmentDate;
    this.appointmentTime = input.appointmentTime;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update(changes, { clock = () => new Date() } = {}) {
    if (changes === null || typeof changes !== 'object' || Array.isArray(changes)) {
      throw new ValidationError('Appointment changes must be an object.');
    }

    const updatedAt = readClock(clock).toISOString();
    return new Appointment(
      {
        ...this,
        ...changes,
        id: this.id,
        createdAt: this.createdAt,
        updatedAt,
      },
      { clock },
    );
  }
}

module.exports = { Appointment, assertNotInPast };
