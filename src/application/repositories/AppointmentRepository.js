class AppointmentRepository {
  async findById() {
    throw new Error('AppointmentRepository.findById must be implemented.');
  }

  async findAll() {
    throw new Error('AppointmentRepository.findAll must be implemented.');
  }

  async findBySlot() {
    throw new Error('AppointmentRepository.findBySlot must be implemented.');
  }

  async create() {
    throw new Error('AppointmentRepository.create must be implemented.');
  }

  async update() {
    throw new Error('AppointmentRepository.update must be implemented.');
  }

  async delete() {
    throw new Error('AppointmentRepository.delete must be implemented.');
  }
}

module.exports = { AppointmentRepository };
