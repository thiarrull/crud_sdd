require('dotenv').config();
const { createComposition } = require('./compositionRoot.js');

function parsePort(value = process.env.PORT ?? '3000') {
  const port = Number(value);
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new TypeError('PORT must be an integer between 0 and 65535.');
  }

  return port;
}

function startServer({ port = parsePort(), databasePath, clock } = {}) {
  const composition = createComposition({ databasePath, clock });
  const server = composition.app.listen(port, () => {
    console.log(`Appointment application listening on port ${server.address().port}.`);
  });
  server.once('close', () => composition.database.close());

  return { ...composition, server };
}

if (require.main === module) {
  startServer();
}

module.exports = { parsePort, startServer };
