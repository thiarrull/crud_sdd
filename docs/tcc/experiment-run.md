# Scenario B Experiment Run

- `run_id`: `scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6`
- `scenario_id`: `B`
- `session_id`: `d9720e3d-d864-4295-ae12-ad4ad6c941f6`
- `started_at`: `2026-11-04T18:10:53.672-03:00` (earliest timestamped user request visible in the available conversation; OpenSpec planning followed)
- `finished_at`: `NOT AVAILABLE` (run ongoing)
- `baseline_sha`: `NOT AVAILABLE`
- `resulting_sha`: `NOT AVAILABLE`
- Evidence cutoff: `2026-11-04T19:31:21.378-03:00`

## M1 — Prompt count

- State: `PARTIALLY MEASURED`
- Observed count: 6 user-originated messages visible in the available conversation, including the initial request, TCC brief, three scope/behavior decisions, and apply invocation.
- Total scenario count: `NOT AVAILABLE`; no complete session export is present, and the available view cannot establish that it includes all interactions.
- Source: current Copilot session conversation; prompt references and known timestamps are in `ai-interaction-log.md`.
- Limitation: skill instructions injected by the tool are not counted as researcher prompts. Missing timestamps and any unobserved prompts are not inferred.

## M2 — Development time

- State: `PARTIALLY MEASURED` (ongoing)
- Earliest observed start: `2026-11-04T18:10:53.672-03:00`.
- Elapsed wall-clock time at evidence cutoff: `80 minutes, 27.706 seconds`.
- Pauses: `NOT AVAILABLE`; no pause duration is deducted.
- Source: timestamped conversation context and baseline audit timestamp.
- Limitation: this is elapsed time, not active effort. Earlier or external work cannot be reconstructed; finish time is pending.

## Event log

| event_id | run_id | scenario_id | session_id | timestamp | event_type | actor | description | prompt_ref | requirement_ref | openspec_task_ref | baseline_sha | resulting_sha | evidence_ref | status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| EV-001 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:10:53.672-03:00 | PROMPT | researcher | Requested inspection of the root OpenSpec brief | P-001 | NOT AVAILABLE | NOT AVAILABLE | NOT AVAILABLE | NOT AVAILABLE | ai-interaction-log.md | observed |
| EV-002 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:14:32.629-03:00 | PROMPT | researcher | Supplied Scenario B TCC brief and requested OpenSpec planning | P-002 | RN-001–RN-010 | appointment-crud | NOT AVAILABLE | NOT AVAILABLE | ai-interaction-log.md | observed |
| EV-003 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | NOT AVAILABLE | SPEC_CREATION | agent | Created initial appointment CRUD planning artifacts | NOT AVAILABLE | RN-001–RN-010 | appointment-crud | NOT AVAILABLE | NOT AVAILABLE | openspec/changes/appointment-crud | timestamp unavailable |
| EV-004 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | NOT AVAILABLE | SPEC_REVISION | agent | Revised the existing plan for Scenario B and added experiment-evidence requirements after researcher confirmation | P-003/P-004 | RN-001–RN-010 | appointment-crud | NOT AVAILABLE | NOT AVAILABLE | openspec/changes/appointment-crud | timestamp unavailable |
| EV-005 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | NOT AVAILABLE | HUMAN_EDIT | researcher | Confirmed permanent appointment deletion behavior | P-005 | Appointment delete | appointment-crud | NOT AVAILABLE | NOT AVAILABLE | appointment-management spec | timestamp unavailable |
| EV-006 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:30:34.973-03:00 | PROMPT | researcher | Requested application of the OpenSpec change | P-006 | RN-001–RN-010 | appointment-crud | NOT AVAILABLE | NOT AVAILABLE | current session | observed |
| EV-007 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:35:12.837-03:00 | VALIDATION | agent | Completed initial workspace, Git availability, runtime, and Python artifact audit | NOT AVAILABLE | Experiment evidence | 1.1–1.3 | NOT AVAILABLE | NOT AVAILABLE | baseline.md; python-artifacts.md | observed |
| EV-008 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:51:32.493-03:00 | IMPLEMENTATION | agent | Initial better-sqlite3 13 source-build attempt failed because Python was unavailable; switched to 12.11.1 with prebuild installer, without executing Python | NOT AVAILABLE | Experiment evidence | 2.2 | NOT AVAILABLE | NOT AVAILABLE | npm ci output; package-lock.json | setup issue resolved |
| EV-009 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T18:57:31.570-03:00 | TEST_RUN | agent | In-memory schema and duplicate-slot integration test passed | NOT AVAILABLE | RN-008/RN-009 persistence constraint | 2.3 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-010 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:01:55.152-03:00 | TEST_RUN | agent | Appointment domain validation unit tests passed; lint and formatting checks passed after a formatting-script correction | NOT AVAILABLE | RN-001–RN-006/RN-010 | 3.1 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-011 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:08:42.686-03:00 | TEST_RUN | agent | Fixed-clock appointment tests passed, including UUID generation, ISO timestamps, and update metadata preservation; lint and formatting checks passed | NOT AVAILABLE | RN-001–RN-007 | 3.3 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-012 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:11:24.885-03:00 | TEST_RUN | agent | Application unit tests passed for create, get, list, update, delete, past-date rejection, historical get/delete, and slot conflicts; lint, format, and dependency-direction inspection passed | NOT AVAILABLE | RN-007–RN-009 | 3.2/4.1 | NOT AVAILABLE | NOT AVAILABLE | test-results.md; src/application | SUCCESS |
| EV-013 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:13:23.536-03:00 | TEST_RUN | agent | Full current unit and integration suite passed (26 tests), including SQLite persistence, unique-slot conflicts, metadata, and permanent deletion; lint and format checks passed | NOT AVAILABLE | RN-001–RN-010 | 4.2 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-014 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | NOT AVAILABLE | DEFECT_FOUND | agent | Repository integration tests exposed passing an Appointment instance to better-sqlite3 named parameters, which requires a plain object | NOT AVAILABLE | RN-008/RN-009 | 4.2 | NOT AVAILABLE | NOT AVAILABLE | corrections.csv | CORRECTED |
| EV-015 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | NOT AVAILABLE | CORRECTION | agent | Added explicit plain-object SQL parameter mapping; the complete unit/integration suite passed afterward | NOT AVAILABLE | RN-008/RN-009 | 4.2 | NOT AVAILABLE | NOT AVAILABLE | corrections.csv; test-results.md | SUCCESS |
| EV-016 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:15:52.304-03:00 | TEST_RUN | agent | Supertest covered all appointment routes and verified 400, 404, 409, and 500 error mappings | NOT AVAILABLE | RN-001–RN-010 | 5.1 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-017 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:18:58.261-03:00 | TEST_RUN | agent | EJS list, detail, create, edit, and error pages rendered successfully; semantic form constraints and static CSS were verified | NOT AVAILABLE | RN-001–RN-010 | 5.2 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-018 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:21:04.005-03:00 | TEST_RUN | agent | Full unit, integration, and HTTP suite passed (32 tests); server startup and architecture import checks passed; lint and format checks passed | NOT AVAILABLE | RN-001–RN-010 | 5.3 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-019 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:27:05.053-03:00 | COVERAGE_RUN | agent | Native Node.js coverage completed for 18 source files: 92.91% lines, 85.99% branches, 84.75% functions; 32 tests passed | NOT AVAILABLE | Experiment evidence | 6.2 | NOT AVAILABLE | NOT AVAILABLE | test-results.md | SUCCESS |
| EV-020 | scenario-b-d9720e3d-d864-4295-ae12-ad4ad6c941f6 | B | d9720e3d-d864-4295-ae12-ad4ad6c941f6 | 2026-11-04T19:31:21.378-03:00 | VALIDATION | agent | Final current suite passed (32 tests) with native coverage; lint, format check, and strict OpenSpec validation passed; Git SHA unavailable | NOT AVAILABLE | RN-001–RN-010 | 6.5 | NOT AVAILABLE | NOT AVAILABLE | test-results.md; OpenSpec validation output | SUCCESS |

Timestamps for untagged decision turns and tool-driven specification operations were not exposed in the available record and are deliberately left unavailable. No events are inferred from commit history.
