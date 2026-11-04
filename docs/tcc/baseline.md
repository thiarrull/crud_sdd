# Scenario B Baseline

## Audit record

- Observed at: `2026-11-04T18:35:12.837-03:00`
- Workspace: `D:\Projetos\crud_sdd`
- Change: `appointment-crud`
- Audit scope: recursive file and directory inspection of the workspace, including hidden files; checks for Git executables at the command name and common Windows installation paths; searches for `.git`, `.svn`, and `.gitmodules`.

## Observed workspace

- Present: `openspec.md`, OpenSpec configuration and change artifacts, and `.github` OpenSpec agent, prompt, skill, and setup-workflow files.
- No application source files, `package.json`, lockfile, application database, or tests were present in the inspected workspace.
- The workspace contains no `.git` or `.svn` directory and no `.gitmodules` file in the inspected tree.
- No Git executable was available through `PATH` or the checked common Windows Git installation paths.

## Repository baseline

- Git root: `NOT AVAILABLE` — Git could not be invoked, and no `.git` directory was found in the workspace.
- Branch and HEAD SHA: `NOT AVAILABLE`.
- Git status/dirty state: `NOT AVAILABLE`; no claim is made that the workspace is clean.
- Nested repositories and gitlinks: no `.git`/`.svn` directories or `.gitmodules` were found in the workspace scan. Gitlink state is `NOT AVAILABLE` because Git metadata could not be inspected.
- Remote, commit history, baseline SHA, and historical file comparison: `NOT AVAILABLE`.

This record describes only the current workspace observation. It does not establish a historical TCC baseline or prove that no repository exists outside the inspected workspace.

## Runtime and comparison context

- Node.js: `v24.22.2` (observed with `node --version`).
- npm: `12.2.1` (observed with `npm --version`).
- OpenSpec CLI: `1.16.0` (observed with `openspec --version`).
- Git: `NOT AVAILABLE` in `PATH` and the checked common installation locations.
- Project dependency versions: `NOT AVAILABLE`; no `package.json` or lockfile exists in the inspected workspace.
- Scenario A Node.js version, dependency set, and coverage conventions: `NOT AVAILABLE`; none were present in the inspected workspace. No equivalence is assumed.

## Scenario B dependency setup

The following exact direct package versions were installed from `package-lock.json` and verified with `npm ls --depth=0` after a successful clean `npm ci`:

- Runtime: `better-sqlite3` 12.11.1, `dotenv` 18.0.9, `ejs` 3.1.10, `express` 5.3.0, `helmet` 8.3.0.
- Development: `@eslint/js` 10.0.1, `eslint` 10.14.0, `globals` 17.14.0, `nodemon` 3.1.14, `prettier` 3.9.10, `supertest` 7.3.1.
- `better-sqlite3` 12.11.1 installed its prebuilt binding on this Windows/Node 24 environment. A trial of 13.0.3 fell back to `node-gyp` and failed because no usable Python build tool was available; Python was not executed. The project remains on the specified JavaScript/SQLite stack.
- Application and CI test results are still `NOT EXECUTED`; no application code or tests exist yet.
