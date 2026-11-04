const {
  AppointmentConflictError,
} = require('../../application/errors/AppointmentConflictError.js');
const {
  AppointmentNotFoundError,
} = require('../../application/errors/AppointmentNotFoundError.js');
const { ValidationError } = require('../../domain/errors/ValidationError.js');

function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = 500;
  let message = 'An unexpected error occurred.';

  if (error instanceof ValidationError) {
    statusCode = 400;
    message = error.message;
  } else if (error instanceof AppointmentNotFoundError) {
    statusCode = 404;
    message = error.message;
  } else if (error instanceof AppointmentConflictError) {
    statusCode = 409;
    message = error.message;
  } else {
    console.error(error);
  }

  return res.status(statusCode).render('error', { statusCode, message });
}

module.exports = { errorHandler };
