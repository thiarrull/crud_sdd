const express = require('express');
const helmet = require('helmet');
const path = require('node:path');
const { errorHandler } = require('../presentation/middlewares/errorHandler.js');
const { createAppointmentRoutes } = require('../presentation/routes/appointmentRoutes.js');

function createApp(controller) {
  const app = express();
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../presentation/views'));
  app.use(helmet());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, '../presentation/public')));
  app.use(createAppointmentRoutes(controller));
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
