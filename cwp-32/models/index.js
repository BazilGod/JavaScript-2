const Sequelize = require('sequelize');
const config = require('../config.json');

module.exports = () => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        logging: false
    };

    const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, options);

    const Repo = require('./repo')(Sequelize, sequelize);
    const Commit = require('./commit')(Sequelize, sequelize);

    Commit.belongsTo(Repo, { foreignKey: 'repoId', onDelete: 'cascade' });

    return {
        repos: Repo,
        commits: Commit,

        Sequelize,
        sequelize,
    };
};