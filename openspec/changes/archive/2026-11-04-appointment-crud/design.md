# Design

## Context

See `proposal.md` for the motivation and scope. The initial workspace inspection found `openspec.md` and OpenSpec configuration/artifacts, but no application source or package manifest; Git could not be invoked in the session. No archived capability specs exist. The initial baseline, repository history, and Scenario A comparison data therefore remain unverified until the pre-change audit can access them.

## Goals / Non-Goals

**Goals:**
- Build only the appointment web application and evidence needed for Scenario B, preserving any pre-existing history or files discovered by the audit.
- Keep business rules in the domain/application layers and verify the actual import graph follows the Dependency Rule.
- Make functional tests, coverage, CI, metrics, and traceability reproducible against identified revisions.

**Non-Goals:**
- Users, authentication, authorization, roles, payments, employees, a REST API, or a frontend framework.
- Reconstructing missing prompts, time, authorship, baseline state, or Scenario A conventions from assumptions.
- Destructive migration, automatic production deployment, or unapproved Git hooks.

## Decisions

- **Audit before touching implementation:** Record the workspace, available Git state and nested repositories, tool/runtime versions, and Python artifacts first. If Git remains unavailable, report baseline and file-diff metrics as `NOT AVAILABLE`/partial; do not describe the workspace as a clean repository. If incompatible historical code is found, preserve it and isolate any aligned reconstruction rather than rewriting the baseline.
- **Clean Architecture with manual composition:** `src/domain/Appointment.js` owns framework-independent invariants; application use cases depend on `src/application/repositories/AppointmentRepository.js`; the SQLite adapter implements that contract; Express controllers and routes call use cases; `src/main/compositionRoot.js` wires concrete dependencies. Verify imports themselves, not just directory placement.
- **Runtime and UI:** Use CommonJS JavaScript, Express, EJS, semantic HTML, and plain CSS/browser JavaScript. Use Node.js 24 and Scenario A's dependency and coverage conventions only after confirming availability and compatibility; record actual versions and mark comparison evidence unavailable when it cannot be obtained. Serve only the specified server-rendered web routes; do not add a parallel REST interface.
- **Domain time handling:** Inject a clock at the application boundary and compare appointment local date/time using `America/Sao_Paulo`. Keep validation independent of Express and SQLite; fixed clocks and timezone edge cases make past-date tests deterministic. Reads and permanent deletes of historical appointments remain available.
- **Persistence and conflicts:** Store the development database at `data/appointments.db`, exclude it from version control, and enforce `UNIQUE(appointment_date, appointment_time)`. Use parameterized statements and map unique-slot violations to the appointment conflict. Use an isolated in-memory SQLite database in tests. Preserve appointment UUID and `createdAt` on update while refreshing `updatedAt`.
- **Web error contract:** Controllers translate validation, missing-record, conflict, and unexpected errors to HTTP 400, 404, 409, and 500 respectively. Do not duplicate business validation in controllers.
- **Evidence records:** Keep experiment records under `docs/tcc/`, with event IDs and references connecting prompts, specs, tasks, code, tests, commits, CI, and validation. Start recording what is observable now; because specification activity already occurred, report unrecoverable M1/M2 intervals as partial or unavailable. Record M3–M8 with provenance and do not infer missing values or causality.
- **Testing and CI:** Use `node:test`, `node:assert/strict`, and Supertest; separate unit, integration, HTTP, and test-double directories. Use Node's native coverage for application code only, reporting lines, branches, functions, and exact file inclusion. CI runs `npm ci`, lint, format check, coverage tests, and available architectural checks against the SHA; workflow existence alone is not a CI result.
- **Python audit:** Search files, package scripts, workflows, OpenSpec, and accessible history; classify references by evidence and scope. Never execute an unknown Python script or remove a historical artifact as part of the audit.

## Risks / Trade-offs

- [Git or historical evidence remains inaccessible] → Mitigation: preserve current files, record the limitation, mark baseline-dependent metrics unavailable, and avoid unsupported clean-baseline claims.
- [Scenario A's runtime or coverage conventions cannot be obtained] → Mitigation: record actual Scenario B versions and report cross-scenario comparability as unavailable rather than assuming equivalence.
- [Timezone conversion or daylight-saving edge cases produce incorrect comparisons] → Mitigation: centralize conversion, inject a clock, and test boundary dates under the required timezone.
- [Concurrent requests race past an application pre-check] → Mitigation: retain the SQLite unique constraint as the final guard and translate its conflict consistently.
- [Experimental reports overstate incomplete evidence] → Mitigation: require source, period, completeness, limitations, and explicit availability states for M1–M8.

## Migration Plan

1. Complete the read-only baseline and compatibility audit before creating application files or changing existing project content.
2. If no compatible application or database exists, create the new implementation without overwriting historical artifacts. If existing data or code is found, document it and design any non-destructive migration separately before applying it.
3. Validate behavior, architecture, tests, coverage, and CI against the recorded revision; retain the evidence and archive the OpenSpec change only after its gates are verified.
4. Roll back only newly introduced application files or changes with an explicitly reviewed, non-destructive procedure; do not rewrite or remove historical Git metadata.
