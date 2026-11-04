const { AppointmentNotFoundError } = require('../errors/AppointmentNotFoundError.js');

class DeleteAppointment {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute(id) {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }

    const deleted = await this.appointmentRepository.delete(id);
    if (!deleted) {
      throw new AppointmentNotFoundError(id);
    }

    return appointment;
  }
}

module.exports = { DeleteAppointment };
