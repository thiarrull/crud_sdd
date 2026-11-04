const { Appointment, assertNotInPast } = require('../../domain/Appointment.js');
const { AppointmentConflictError } = require('../errors/AppointmentConflictError.js');

class CreateAppointment {
  constructor({ appointmentRepository, clock = () => new Date() }) {
    this.appointmentRepository = appointmentRepository;
    this.clock = clock;
  }

  async execute(input) {
    const appointment = new Appointment(input, { clock: this.clock });
    assertNotInPast(appointment, this.clock);

    const conflict = await this.appointmentRepository.findBySlot(
      appointment.appointmentDate,
      appointment.appointmentTime,
    );
    if (conflict) {
      throw new AppointmentConflictError(appointment.appointmentDate, appointment.appointmentTime);
    }

    return this.appointmentRepository.create(appointment);
  }
}

module.exports = { CreateAppointment };
