const {
  AppointmentConflictError,
} = require('../../application/errors/AppointmentConflictError.js');
const {
  AppointmentRepository,
} = require('../../application/repositories/AppointmentRepository.js');
const { Appointment } = require('../../domain/Appointment.js');

const appointmentColumns = `
  id,
  client_name AS clientName,
  service,
  appointment_date AS appointmentDate,
  appointment_time AS appointmentTime,
  notes,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

function toAppointment(row) {
  if (!row) {
    return null;
  }

  return new Appointment(row);
}

function toParameters(appointment) {
  return {
    id: appointment.id,
    clientName: appointment.clientName,
    service: appointment.service,
    appointmentDate: appointment.appointmentDate,
    appointmentTime: appointment.appointmentTime,
    notes: appointment.notes,
    createdAt: appointment.createdAt,
    updatedAt: appointment.updatedAt,
  };
}

function isUniqueConstraint(error) {
  return error.code === 'SQLITE_CONSTRAINT_UNIQUE';
}

class SQLiteAppointmentRepository extends AppointmentRepository {
  constructor(database) {
    super();
    this.database = database;
  }

  async findById(id) {
    const row = this.database
      .prepare(`SELECT ${appointmentColumns} FROM appointments WHERE id = @id`)
      .get({ id });
    return toAppointment(row);
  }

  async findAll() {
    const rows = this.database
      .prepare(
        `SELECT ${appointmentColumns}
         FROM appointments
         ORDER BY appointment_date, appointment_time, id`,
      )
      .all();
    return rows.map(toAppointment);
  }

  async findBySlot(appointmentDate, appointmentTime, excludeId = null) {
    const row = this.database
      .prepare(
        `SELECT ${appointmentColumns}
         FROM appointments
         WHERE appointment_date = @appointmentDate
           AND appointment_time = @appointmentTime
           AND (@excludeId IS NULL OR id <> @excludeId)
         LIMIT 1`,
      )
      .get({ appointmentDate, appointmentTime, excludeId });
    return toAppointment(row);
  }

  async create(appointment) {
    try {
      this.database
        .prepare(
          `INSERT INTO appointments (
            id, client_name, service, appointment_date, appointment_time, notes, created_at, updated_at
          ) VALUES (
            @id, @clientName, @service, @appointmentDate, @appointmentTime, @notes, @createdAt, @updatedAt
          )`,
        )
        .run(toParameters(appointment));
    } catch (error) {
      if (isUniqueConstraint(error)) {
        throw new AppointmentConflictError(
          appointment.appointmentDate,
          appointment.appointmentTime,
        );
      }

      throw error;
    }

    return appointment;
  }

  async update(appointment) {
    let result;
    try {
      result = this.database
        .prepare(
          `UPDATE appointments
           SET client_name = @clientName,
               service = @service,
               appointment_date = @appointmentDate,
               appointment_time = @appointmentTime,
               notes = @notes,
               created_at = @createdAt,
               updated_at = @updatedAt
           WHERE id = @id`,
        )
        .run(toParameters(appointment));
    } catch (error) {
      if (isUniqueConstraint(error)) {
        throw new AppointmentConflictError(
          appointment.appointmentDate,
          appointment.appointmentTime,
        );
      }

      throw error;
    }

    if (result.changes === 0) {
      return null;
    }

    return appointment;
  }

  async delete(id) {
    const result = this.database.prepare('DELETE FROM appointments WHERE id = @id').run({ id });
    return result.changes > 0;
  }
}

module.exports = { SQLiteAppointmentRepository };
