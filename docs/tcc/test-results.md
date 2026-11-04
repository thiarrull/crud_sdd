# Test Execution Evidence

This log records actual test executions; each row is limited to that run. The final current validation run is explicitly identified below.

| run_id | timestamp | command | SHA | Node.js | tests | passed | failed | skipped | duration | result |
|---|---|---|---|---|---:|---:|---:|---:|---:|---|
| 43c5f208-e94c-4bec-8172-bacfe5e4b8e2 | 2026-11-04T18:57:31.570-03:00 | `node --test tests/integration/database.test.js` | NOT AVAILABLE | v24.22.2 | 1 | 1 | 0 | 0 | 148.6002 ms (Node test runner) | SUCCESS |
| bd2ba734-a737-4bcd-841b-e55cfbf8f9a9 | 2026-11-04T18:59:21.118-03:00 | `node --test tests/unit/appointment.test.js` | NOT AVAILABLE | v24.22.2 | 6 | 6 | 0 | 0 | 127.7267 ms (Node test runner) | SUCCESS |
| 640b4338-b9ae-4202-b4e4-8ff51d70dcf1 | 2026-11-04T19:00:19.096-03:00 | `node --test tests/unit/appointment.test.js` | NOT AVAILABLE | v24.22.2 | 6 | 6 | 0 | 0 | 159.9202 ms (Node test runner) | SUCCESS |
| fa588b36-d5b0-40f5-9c13-6de6bd09c6ba | 2026-11-04T19:01:26.047-03:00 | `node --test tests/unit/appointment.test.js tests/integration/database.test.js` | NOT AVAILABLE | v24.22.2 | 7 | 7 | 0 | 0 | 177.597 ms (Node test runner) | SUCCESS |
| d79a0ac0-de3c-4ca1-875e-8595bacd67ad | 2026-11-04T19:01:55.152-03:00 | `node --test tests/unit/appointment.test.js` | NOT AVAILABLE | v24.22.2 | 6 | 6 | 0 | 0 | 149.8714 ms (Node test runner) | SUCCESS |
| b087dea1-716c-4515-9320-45013202323c | 2026-11-04T19:06:56.402-03:00 | `node --test tests/unit/appointment.test.js` | NOT AVAILABLE | v24.22.2 | 9 | 9 | 0 | 0 | 162.9785 ms (Node test runner) | SUCCESS |
| 5c921555-8666-4b8c-bfce-ac763f858494 | 2026-11-04T19:08:42.686-03:00 | `node --test tests/unit/appointment.test.js` | NOT AVAILABLE | v24.22.2 | 11 | 11 | 0 | 0 | 201.5543 ms (Node test runner) | SUCCESS |
| 2d164b59-6605-4e9f-9263-f554bbeb7e5e | 2026-11-04T19:11:24.885-03:00 | `node --test tests/unit/appointment.test.js tests/unit/use-cases.test.js` | NOT AVAILABLE | v24.22.2 | 18 | 18 | 0 | 0 | 438.7072 ms (Node test runner) | SUCCESS |
| c5a0b1d4-41b6-498a-99eb-57b6e24761ce | 2026-11-04T19:13:23.536-03:00 | `npm test` | NOT AVAILABLE | v24.22.2 | 26 | 26 | 0 | 0 | 463.0699 ms (Node test runner) | SUCCESS |
| 6eb4651b-07c4-41cc-864b-1a047f1a5892 | 2026-11-04T19:15:52.304-03:00 | `node --test tests/http/appointment-routes.test.js` | NOT AVAILABLE | v24.22.2 | 2 | 2 | 0 | 0 | 561.7928 ms (Node test runner) | SUCCESS |
| 85352ec1-4ec3-48be-8d81-9eab835d74e9 | 2026-11-04T19:18:58.261-03:00 | `node --test tests/http/appointment-routes.test.js` | NOT AVAILABLE | v24.22.2 | 2 | 2 | 0 | 0 | 571.4578 ms (Node test runner) | SUCCESS |
| 35b5a0a3-35ff-46fa-aeeb-597be93e2b66 | 2026-11-04T19:21:04.005-03:00 | `npm test` | NOT AVAILABLE | v24.22.2 | 32 | 32 | 0 | 0 | 853.8433 ms (Node test runner) | SUCCESS |
| 293d30bc-c36c-454a-9378-c5794583e741 | 2026-11-04T19:27:05.053-03:00 | `npm run test:coverage` | NOT AVAILABLE | v24.22.2 | 32 | 32 | 0 | 0 | 987.0749 ms (Node test runner) | SUCCESS |
| 069a5290-f798-420a-b733-ca6c55a276f9 | 2026-11-04T19:31:21.378-03:00 | `npm run test:coverage` | NOT AVAILABLE | v24.22.2 | 32 | 32 | 0 | 0 | 913.1336 ms (Node test runner) | SUCCESS; final workspace validation |

Scope includes the current unit, integration, and HTTP test suites, including in-memory SQLite initialization, persistence, metadata, slot conflicts, web journeys, and permanent deletion. The shell-observed duration for the `npm test` run was 1,247 ms; the table records the Node test runner's reported `duration_ms`.

SHA-based association with a final commit is `NOT AVAILABLE` because Git metadata is unavailable.

## Native Node.js Coverage

| run_id | timestamp | command | SHA | Node.js | lines | branches | functions | included files | excluded files | result |
|---|---|---|---|---|---:|---:|---:|---|---|---|
| 293d30bc-c36c-454a-9378-c5794583e741 | 2026-11-04T19:27:05.053-03:00 | `npm run test:coverage` (`node --test --experimental-test-coverage --test-coverage-include=src/**/*.js`) | NOT AVAILABLE | v24.22.2 | 92.91% | 85.99% | 84.75% | All 18 source files: `src/application/errors/AppointmentConflictError.js`, `src/application/errors/AppointmentNotFoundError.js`, `src/application/repositories/AppointmentRepository.js`, `src/application/use-cases/CreateAppointment.js`, `src/application/use-cases/DeleteAppointment.js`, `src/application/use-cases/GetAppointment.js`, `src/application/use-cases/ListAppointments.js`, `src/application/use-cases/UpdateAppointment.js`, `src/domain/Appointment.js`, `src/domain/errors/ValidationError.js`, `src/infrastructure/database/database.js`, `src/infrastructure/repositories/SQLiteAppointmentRepository.js`, `src/main/app.js`, `src/main/compositionRoot.js`, `src/main/server.js`, `src/presentation/controllers/AppointmentController.js`, `src/presentation/middlewares/errorHandler.js`, `src/presentation/routes/appointmentRoutes.js` | Tests, EJS templates, CSS, docs | SUCCESS; 32 tests passed |
| 069a5290-f798-420a-b733-ca6c55a276f9 | 2026-11-04T19:31:21.378-03:00 | `npm run test:coverage` (`node --test --experimental-test-coverage --test-coverage-include=src/**/*.js`) | NOT AVAILABLE | v24.22.2 | 92.91% | 85.99% | 84.75% | Same exact 18 `src/**/*.js` paths listed in the preceding coverage row | Tests, EJS templates, CSS, docs | SUCCESS; 32 tests passed; final validation run |
