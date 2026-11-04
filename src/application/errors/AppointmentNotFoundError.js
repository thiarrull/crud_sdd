class AppointmentNotFoundError extends Error {
  constructor(id) {
    super(`Appointment "${id}" was not found.`);
    this.name = 'AppointmentNotFoundError';
    this.id = id;
  }
}

module.exports = { AppointmentNotFoundError };
