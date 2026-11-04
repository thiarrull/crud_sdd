# Spec Delta

## Purpose

The experiment-evidence capability makes the Scenario B development history, measurements, and validation reproducible without inventing evidence or conflating later corrections with the original baseline.

## ADDED Requirements

### Requirement: Baseline and environment evidence is established before project changes
The execution MUST record the accessible workspace, repository state, baseline reference, nested repositories, tool versions, and known limitations before implementation changes.

#### Scenario: Repository metadata is available
- **WHEN** the pre-change audit can inspect Git and project files
- **THEN** the baseline record MUST include the observed status, branch, commit SHA, nested repositories or gitlinks, and identified stack

#### Scenario: Repository metadata is unavailable
- **WHEN** Git history or other baseline evidence cannot be accessed
- **THEN** the record MUST mark that evidence `NOT AVAILABLE` and MUST NOT claim the baseline is clean or historically verified

### Requirement: Prompt count and development time retain their evidence boundaries
The experiment MUST record M1 prompt references and M2 timestamps, elapsed time, and documented pauses without treating unavailable history as zero.

#### Scenario: Prompt and time evidence is recorded
- **WHEN** a human prompt, development start or finish, pause, or resume is observable
- **THEN** M1 MUST record `session_id`, `prompt_id`, timestamp, and prompt reference, while M2 MUST record ISO 8601 start/finish times, documented pauses, and elapsed time; both summaries MUST state source, period, completeness, and limitations

#### Scenario: Measurement begins after work has already occurred
- **WHEN** earlier specification or development activity cannot be reconstructed
- **THEN** M1/M2 MUST be marked `PARTIALLY MEASURED` or `NOT AVAILABLE`, with the unrecovered interval identified rather than estimated

### Requirement: Corrections, file changes, and human interventions are classified
The experiment MUST distinguish defects from other work, count unique changed files against the baseline when available, and record only identifiable human interventions.

#### Scenario: A correction or intervention is documented
- **WHEN** a defect is corrected or a human edit, review, approval, or manual command is evidenced
- **THEN** each distinct defect MUST have a `correction_id`, category, description, evidence, affected files, related requirement, corrective change, commits, and validation result; human intervention records MUST identify type, date, files, evidence, and known actor without inferring authorship from a commit alone

#### Scenario: File comparison or authorship cannot be established
- **WHEN** baseline/final SHAs or reliable authorship evidence are unavailable
- **THEN** the corresponding M3, M4, or M8 value MUST be marked unavailable or partial and MUST NOT be replaced with a guessed count

#### Scenario: Changed files are summarized
- **WHEN** M4 is calculated from available baseline and final references
- **THEN** each unique path MUST be counted once, application, tests, configuration, OpenSpec, and experimental documentation MUST be separated, and additional specification files MUST be reported separately from the Scenario A-comparable count

#### Scenario: Human intervention is measured
- **WHEN** identifiable manual code/test/config edits, spec/design revisions, prompts, approvals, or command executions occur
- **THEN** each intervention MUST receive an `intervention_id` and date, type, files, Git reference, and evidence when available; unknown authorship MUST be labeled `AUTORIA NÃO DETERMINADA`

### Requirement: Test, coverage, and CI evidence is tied to the verified revision
The experiment MUST record actual M5 test runs, M6 native Node.js coverage, and M7 CI results with their command, timestamp, tool/runtime version, and commit reference when available.

#### Scenario: Validation run completes
- **WHEN** tests, coverage, or CI execute
- **THEN** evidence MUST contain the applicable run identifier, SHA, command, timestamp, runtime version, result, duration, and test totals or line/branch/function coverage with included/excluded files or jobs

#### Scenario: CI outcome is classified
- **WHEN** a GitHub Actions workflow run is recorded
- **THEN** M7 MUST use `SUCCESS`, `FAILURE`, `CANCELLED`, `SKIPPED`, `NOT_EXECUTED`, or `UNKNOWN` and include repository, commit SHA, workflow, run ID and URL when available, date, jobs, failures, and retries

#### Scenario: Validation was not executed or cannot be linked
- **WHEN** a test, coverage, or CI run was not executed or cannot be associated with the analyzed revision
- **THEN** its state MUST be recorded as `NOT_EXECUTED` or `UNKNOWN` and MUST NOT be reported as a successful validation

### Requirement: Experimental events and requirement traceability are maintained
The experiment MUST maintain uniquely identified events and trace each RN-001–RN-010 requirement through its acceptance scenario, OpenSpec task, implementation, test, commit, and validation result.

#### Scenario: Evidence is available for a requirement
- **WHEN** a requirement is implemented or validated
- **THEN** its traceability entry MUST link the available artifacts and mark each unavailable link explicitly as `NOT AVAILABLE` or `NOT VERIFIED`

#### Scenario: An event occurs
- **WHEN** a prompt, specification change, implementation, test, defect, correction, human edit, commit, CI run, pause, resume, or validation occurs
- **THEN** the event log MUST record `event_id`, `run_id`, `scenario_id=B`, `session_id`, timestamp, type, actor, description, prompt/requirement/OpenSpec-task references, baseline/resulting SHAs, evidence reference, and status when available

### Requirement: Python artifacts are audited without executing unknown scripts
The Scenario B audit MUST classify discovered Python files and references, document the search scope and evidence, and avoid executing unknown scripts or deleting historical files without preserving their reference.

#### Scenario: Python artifacts or references are found
- **WHEN** the defined workspace, configuration, OpenSpec, workflow, or available Git-history search finds a Python occurrence
- **THEN** `docs/tcc/python-artifacts.md` MUST record objective, repository/SHA, paths, available history, evidenced purpose, dependencies, runtime participation, classification, architecture impact, decision, later corrections, tests, limitations, and conclusion

#### Scenario: No Python occurrence is found
- **WHEN** the documented search finds no Python file or reference
- **THEN** the audit MUST record the negative result and the exact search scope rather than claiming an unrestricted search

### Requirement: Metric summaries distinguish measured and unavailable data
Each M1–M8 summary MUST include a value and unit when measurable, source, period, completeness, limitations, and one of the defined evidence states.

#### Scenario: A metric is summarized
- **WHEN** the experiment report presents an M1–M8 result
- **THEN** it MUST use `MEASURED`, `PARTIALLY MEASURED`, `NOT AVAILABLE`, `NOT EXECUTED`, or `NOT APPLICABLE` accurately and MUST NOT convert missing data to zero or claim causal superiority
