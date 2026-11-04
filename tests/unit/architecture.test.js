const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const sourceRoot = path.join(__dirname, '../../src');

function listJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listJavaScriptFiles(entryPath)
      : entryPath.endsWith('.js')
        ? [entryPath]
        : [];
  });
}

function requiredModules(source) {
  return [...source.matchAll(/require\(['"]([^'"]+)['"]\)/g)].map((match) => match[1]);
}

test('domain and application layers do not depend on web or SQLite implementation details', () => {
  const restrictedRoots = ['domain', 'application'];
  const forbiddenModules =
    /^(?:express|ejs|better-sqlite3)$|SQLiteAppointmentRepository|(?:^|\/)(?:infrastructure|presentation)(?:\/|$)/;

  for (const root of restrictedRoots) {
    const files = listJavaScriptFiles(path.join(sourceRoot, root));
    for (const file of files) {
      const modules = requiredModules(fs.readFileSync(file, 'utf8'));
      assert.deepEqual(
        modules.filter((specifier) => forbiddenModules.test(specifier)),
        [],
        `${path.relative(sourceRoot, file)} must not import concrete web or persistence modules`,
      );
    }
  }
});
