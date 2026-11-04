# Proposal

## Why

This workspace has an OpenSpec brief but no application source or package manifest, and Git tooling was unavailable during the initial inspection. The appointment CRUD therefore needs a controlled, auditable execution that establishes what baseline evidence is available before implementation and does not present unknown history or measurements as facts.

## What Changes

- Audit the workspace, repository history if accessible, nested repositories, existing Python files/references, and available OpenSpec/runtime versions before modifying project files; document unavailable evidence explicitly.
- Implement the appointment lifecycle and its RN-001–RN-010 business rules as a monolithic web application, with no user/authentication domain or parallel REST frontend.
- Add automated unit, integration, and HTTP tests, native Node.js coverage, lint/format checks, and CI evidence tied to the verified commit.
- Maintain experiment records for M1–M8, event history, corrections, human interventions, Python audit, and requirement-to-validation traceability under `docs/tcc/`.
- Preserve historical files and Git history; do not fabricate baseline, prompts, elapsed time, test results, authorship, coverage, or CI outcomes. Mark missing or unrecoverable evidence using the specified availability states.

## Capabilities

### New Capabilities
- `appointment-management`: Covers the web-based appointment lifecycle, validation, conflict handling, and record metadata.
- `experiment-evidence`: Defines reproducible records for the baseline, events, metrics, traceability, Python audit, and validation evidence for Scenario B.

### Modified Capabilities
- None. The project has no archived capability specs; the existing appointment requirements are an in-flight delta.

## Impact

- Planned application areas: `src/domain/`, `src/application/`, `src/infrastructure/`, `src/presentation/`, and `src/main/`.
- Planned tests: `tests/unit/`, `tests/integration/`, `tests/http/`, and `tests/doubles/`.
- Planned experiment and traceability records: `docs/tcc/`; CI: `.github/workflows/ci.yml`.
- Runtime stack: JavaScript/CommonJS, Express, EJS, SQLite with `better-sqlite3`; use Node.js 24 and Scenario A's dependency/coverage conventions only if confirmed compatible and available. Record actual versions; if Scenario A evidence cannot be obtained, record the comparison as unavailable.
