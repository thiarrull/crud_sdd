const express = require('express');

function createAppointmentRoutes(controller) {
  const router = express.Router();

  router.get('/', controller.list.bind(controller));
  router.get('/appointments', controller.list.bind(controller));
  router.get('/appointments/new', controller.newForm.bind(controller));
  router.post('/appointments', controller.create.bind(controller));
  router.get('/appointments/:id/edit', controller.editForm.bind(controller));
  router.get('/appointments/:id', controller.details.bind(controller));
  router.post('/appointments/:id/update', controller.update.bind(controller));
  router.post('/appointments/:id/delete', controller.delete.bind(controller));

  return router;
}

module.exports = { createAppointmentRoutes };
