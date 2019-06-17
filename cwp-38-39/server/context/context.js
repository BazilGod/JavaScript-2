module.exports = (Sequelize, config) => {
    const options = {
      host: config.db.host,
      port: config.db.port,
      dialect: config.db.dialect,
      define: config.db.define,
      dialectOptions: config.db.dialectOptions,
      paranoid: true,
      timestamps: false
    };
  
    const sequelize = new Sequelize(
      config.db.name,
      config.db.user,
      config.db.password,
      options
    );
  
    const Routes = require("../models/Route")(Sequelize, sequelize);
  
    return {
      Routes,
      sequelize,
      Sequelize
    };
  };
  