class AppointmentController {
  constructor({
    createAppointment,
    getAppointment,
    listAppointments,
    updateAppointment,
    deleteAppointment,
  }) {
    this.createAppointment = createAppointment;
    this.getAppointment = getAppointment;
    this.listAppointments = listAppointments;
    this.updateAppointment = updateAppointment;
    this.deleteAppointment = deleteAppointment;
  }

  async list(req, res) {
    const appointments = await this.listAppointments.execute();
    res.render('appointments/index', { appointments });
  }

  newForm(req, res) {
    res.render('appointments/new', { appointment: {} });
  }

  async create(req, res) {
    const appointment = await this.createAppointment.execute(req.body);
    res.redirect(303, `/appointments/${appointment.id}`);
  }

  async details(req, res) {
    const appointment = await this.getAppointment.execute(req.params.id);
    res.render('appointments/show', { appointment });
  }

  async editForm(req, res) {
    const appointment = await this.getAppointment.execute(req.params.id);
    res.render('appointments/edit', { appointment });
  }

  async update(req, res) {
    const appointment = await this.updateAppointment.execute(req.params.id, req.body);
    res.redirect(303, `/appointments/${appointment.id}`);
  }

  async delete(req, res) {
    await this.deleteAppointment.execute(req.params.id);
    res.redirect(303, '/appointments');
  }
}

module.exports = { AppointmentController };
