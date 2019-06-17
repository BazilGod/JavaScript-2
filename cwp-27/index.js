const Sequelize = require('sequelize');
const config = require('./config.json');

const db = require('./context')(Sequelize, config);
const server = require('./server')(db, config);

const host = config.server.host;
const port = config.server.port;

(async function() {
    await db.sequelize.sync();

    server.listen(port, host, () => console.log(`Server running on http://${host}:${port}`));
})();
 