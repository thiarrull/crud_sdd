const fs = require('node:fs');
const path = require('node:path');
const Database = require('better-sqlite3');

function createDatabase(databasePath = process.env.DATABASE_PATH ?? 'data/appointments.db') {
  const resolvedPath =
    databasePath === ':memory:' ? databasePath : path.resolve(process.cwd(), databasePath);

  if (resolvedPath !== ':memory:') {
    fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
  }

  const database = new Database(resolvedPath);
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  database.exec(schema);

  return database;
}

module.exports = { createDatabase };
