class ListAppointments {
  constructor({ appointmentRepository }) {
    this.appointmentRepository = appointmentRepository;
  }

  async execute() {
    return this.appointmentRepository.findAll();
  }
}

module.exports = { ListAppointments };
