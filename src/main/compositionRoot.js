const { CreateAppointment } = require('../application/use-cases/CreateAppointment.js');
const { DeleteAppointment } = require('../application/use-cases/DeleteAppointment.js');
const { GetAppointment } = require('../application/use-cases/GetAppointment.js');
const { ListAppointments } = require('../application/use-cases/ListAppointments.js');
const { UpdateAppointment } = require('../application/use-cases/UpdateAppointment.js');
const { createDatabase } = require('../infrastructure/database/database.js');
const {
  SQLiteAppointmentRepository,
} = require('../infrastructure/repositories/SQLiteAppointmentRepository.js');
const { AppointmentController } = require('../presentation/controllers/AppointmentController.js');
const { createApp } = require('./app.js');

function createComposition({ databasePath, clock } = {}) {
  const database = createDatabase(databasePath);
  const appointmentRepository = new SQLiteAppointmentRepository(database);
  const controller = new AppointmentController({
    createAppointment: new CreateAppointment({ appointmentRepository, clock }),
    getAppointment: new GetAppointment({ appointmentRepository }),
    listAppointments: new ListAppointments({ appointmentRepository }),
    updateAppointment: new UpdateAppointment({ appointmentRepository, clock }),
    deleteAppointment: new DeleteAppointment({ appointmentRepository }),
  });

  return {
    app: createApp(controller),
    database,
  };
}

module.exports = { createComposition };
