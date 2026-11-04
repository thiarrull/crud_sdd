# Requirements Traceability

This matrix links each Scenario B business requirement to its OpenSpec acceptance scenario, implementation, tests, and observed validation. Git was unavailable in the workspace; commit references and SHA-based attribution are therefore `NOT AVAILABLE`.

| Requirement | Acceptance scenario | OpenSpec task | Implementation | Test evidence | Commit | Validation |
|---|---|---|---|---|---|---|
| RN-001 | Blank or whitespace-only client name is rejected | 3.1, 5.1 | `src/domain/Appointment.js`; `src/application/use-cases/CreateAppointment.js`; `src/application/use-cases/UpdateAppointment.js` | `tests/unit/appointment.test.js`; `tests/http/appointment-routes.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66`; HTTP 400 |
| RN-002 | Missing or blank service is rejected | 3.1 | `src/domain/Appointment.js` | `tests/unit/appointment.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-003 | Missing appointment date is rejected | 3.1 | `src/domain/Appointment.js` | `tests/unit/appointment.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-004 | Missing appointment time is rejected | 3.1 | `src/domain/Appointment.js` | `tests/unit/appointment.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-005 | Impossible or malformed calendar dates are rejected | 3.1 | `src/domain/Appointment.js` | `tests/unit/appointment.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-006 | Invalid 24-hour times are rejected | 3.1 | `src/domain/Appointment.js` | `tests/unit/appointment.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-007 | Past creation/update is rejected in Sao Paulo time; historical reads/deletes remain permitted | 3.2, 4.1, 5.1 | `src/domain/Appointment.js`; `src/application/use-cases/CreateAppointment.js`; `src/application/use-cases/UpdateAppointment.js`; `src/application/use-cases/GetAppointment.js`; `src/application/use-cases/DeleteAppointment.js` | `tests/unit/appointment.test.js`; `tests/unit/use-cases.test.js`; `tests/integration/appointment-repository.test.js`; `tests/http/appointment-routes.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66`; historical route/read/delete and fixed-clock tests passed |
| RN-008 | Creating a second appointment in an occupied date/time slot returns a conflict | 4.1, 4.2, 5.1 | `src/application/use-cases/CreateAppointment.js`; `src/infrastructure/repositories/SQLiteAppointmentRepository.js`; `src/infrastructure/database/schema.sql`; `src/presentation/middlewares/errorHandler.js` | `tests/unit/use-cases.test.js`; `tests/integration/appointment-repository.test.js`; `tests/http/appointment-routes.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66`; HTTP 409 |
| RN-009 | Updating an appointment without changing its own slot succeeds; another appointment's slot conflicts | 4.1, 4.2 | `src/application/use-cases/UpdateAppointment.js`; `src/infrastructure/repositories/SQLiteAppointmentRepository.js` | `tests/unit/use-cases.test.js`; `tests/integration/appointment-repository.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` |
| RN-010 | Notes are optional; values over 500 characters are rejected | 3.1, 5.2 | `src/domain/Appointment.js`; `src/presentation/views/appointments/_form.ejs` | `tests/unit/appointment.test.js`; `tests/http/appointment-routes.test.js` | NOT AVAILABLE | `35b5a0a3-35ff-46fa-aeeb-597be93e2b66`; rendered form enforces `maxlength=500` |

## Web acceptance scenarios

The list, create, details, edit, update, and permanent-delete journeys are implemented by `src/presentation/controllers/AppointmentController.js` and `src/presentation/routes/appointmentRoutes.js`, rendered by `src/presentation/views/appointments/`, and covered by `tests/http/appointment-routes.test.js`. The observed runs `85352ec1-4ec3-48be-8d81-9eab835d74e9` and `35b5a0a3-35ff-46fa-aeeb-597be93e2b66` passed. Commit reference: `NOT AVAILABLE`.

## Architecture and revision evidence

`tests/unit/architecture.test.js` checks that Domain and Application imports do not depend on Express, EJS, the concrete SQLite repository, or Infrastructure/Presentation. The test passed in run `35b5a0a3-35ff-46fa-aeeb-597be93e2b66`. Baseline SHA, resulting SHA, and commit history: `NOT AVAILABLE`.
