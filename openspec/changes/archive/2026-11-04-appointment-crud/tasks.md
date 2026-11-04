# Tasks

## 1. Baseline and experiment setup

- [x] 1.1 Before creating application files, inspect workspace contents, Git root/status/branch/HEAD, nested repositories, and gitlinks; record observed facts in `docs/tcc/baseline.md` and mark inaccessible evidence `NOT AVAILABLE` without claiming a clean baseline
- [x] 1.2 Record OpenSpec, Node.js, npm, and available project/tool versions, and locate Scenario A's Node/dependency/coverage conventions if accessible; verify `baseline.md` lists actual values or explicit unavailable states
- [x] 1.3 Search Python files and references in the workspace, package scripts, workflows, OpenSpec, and accessible history without executing unknown scripts; create `docs/tcc/python-artifacts.md` with findings, classifications, search scope, and limitations (Experiment evidence: Python artifacts are audited)
- [x] 1.4 Start an event log for observable work and available prompt/session references in `docs/tcc/experiment-run.md`, `docs/tcc/ai-interaction-log.md`, and `docs/tcc/sessions.csv`; mark earlier unrecoverable M1/M2 history partial or unavailable and verify no missing interval is estimated (Experiment evidence: Prompt count and development time retain their evidence boundaries)

## 2. Bootstrap and persistence

- [x] 2.1 Create the CommonJS clean-architecture layout and package scripts for the approved stack, using Node.js 24 only if compatible; verify expected files, actual versions, and dependency direction constraints are recorded
- [x] 2.2 Add dependency lockfile, development configuration, and ignore rules for `data/appointments.db`; verify a clean `npm ci` succeeds without introducing prohibited stack components
- [x] 2.3 Define the SQLite schema with UUID/timestamp fields and `UNIQUE(appointment_date, appointment_time)`; verify initialization and duplicate-slot rejection with an isolated database while preserving the original workspace baseline

## 3. Domain rules and unit tests

- [x] 3.1 Implement `src/domain/Appointment.js` for RN-001–RN-006 and RN-010; verify unit tests cover trimming, missing values, impossible dates, invalid times, and the 500-character boundary
- [x] 3.2 Implement clock-injected RN-007 validation using `America/Sao_Paulo`; verify fixed-clock tests reject past creation/updates and permit historical reads/deletes
- [x] 3.3 Define UUID and ISO 8601 timestamp behavior, including preserved `createdAt` and refreshed `updatedAt`; verify focused entity tests and record the run in `docs/tcc/test-results.md`

## 4. Application use cases and SQLite adapter

- [x] 4.1 Define `AppointmentRepository` and the five use cases without importing the concrete SQLite repository; verify application unit tests for create, get, list, update, and delete, and inspect actual imports for the Dependency Rule
- [x] 4.2 Implement the parameterized SQLite adapter, unique-slot conflict translation, self-ID exclusion on updates, metadata preservation, and permanent deletion; verify repository integration tests for RN-008/RN-009, timestamps, persistence, and conflicts
- [x] 4.3 Record test runs, verified changes, defects versus non-defect work, and identifiable human interventions as they occur; update `docs/tcc/corrections.csv` and `docs/tcc/human-interventions.csv` without inferring authorship (Experiment evidence: Corrections, file changes, and human interventions are classified)

## 5. Web presentation and composition

- [x] 5.1 Implement the specified Express routes, controllers, and error middleware for RN-001–RN-010; verify Supertest covers all routes and HTTP mappings 400/404/409/500 in `tests/http/`
- [x] 5.2 Create semantic EJS pages, forms, and plain CSS for list, details, create, and edit flows; verify rendered list and forms support the specified web journeys without a REST API or frontend framework
- [x] 5.3 Wire `src/main/compositionRoot.js`, `app.js`, and `server.js`; verify the application starts and architecture checks confirm domain/application do not depend on Express, EJS, or SQLite

## 6. Traceability, metrics, and final verification

- [x] 6.1 Create `docs/tcc/requirements-traceability.md` mapping RN-001–RN-010 and acceptance scenarios to OpenSpec tasks, implementation files, tests, commits, and validation; verify every unavailable link is marked `NOT AVAILABLE` or `NOT VERIFIED`
- [x] 6.2 Run and record actual unit, integration, and HTTP results in `docs/tcc/test-results.md`; generate native Node.js line/branch/function coverage for application files only and record Node version, SHA, command, file inclusion, and result for M5/M6
- [x] 6.3 Summarize M1–M8 in `docs/tcc/metrics-summary.md` with value/unit, source, period, completeness, limitations, and the defined state; verify missing values remain explicit and M3/M4 counts are not inferred without baseline evidence
- [x] 6.4 Add `.github/workflows/ci.yml` for `npm ci`, lint, format check, coverage tests, and available architecture checks; record a real run and SHA in `docs/tcc/ci-evidence.md`, or mark M7 `NOT_EXECUTED`/`UNKNOWN` if CI cannot run
- [x] 6.5 Verify all completion gates against actual artifacts and a final validation run tied to the analyzed revision; confirm no task or metric is reported complete without evidence

## Workflow follow-up

- Archive the change only after its completion gates are evidenced, then verify the archived result.
