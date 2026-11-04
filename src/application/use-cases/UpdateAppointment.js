const { assertNotInPast } = require('../../domain/Appointment.js');
const { AppointmentConflictError } = require('../errors/AppointmentConflictError.js');
const { AppointmentNotFoundError } = require('../errors/AppointmentNotFoundError.js');

class UpdateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  async execute(id, changes) {
    const existing = await this.appointmentRepository.findById(id);
    if (!existing) {
      throw new AppointmentNotFoundError(id);
    }

    const appointment = existing.update(changes, { clock: this.clock });
    assertNotInPast(appointment, this.clock);

    const conflict = await this.appointmentRepository.findBySlot(
      appointment.appointmentDate,
      appointment.appointmentTime,
      id,
    );
    if (conflict) {
      throw new AppointmentConflictError(appointment.appointmentDate, appointment.appointmentTime);
    }

    const updated = await this.appointmentRepository.update(appointment);
    if (!updated) {
      throw new AppointmentNotFoundError(id);
    }

    return updated;
  }
}

module.exports = { UpdateAppointment };
