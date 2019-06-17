module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "routes",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.INTEGER
      },
      transport: {
        type: Sequelize.STRING
      },
      from: {
        type: Sequelize.STRING
      },
      to: {
        type: Sequelize.STRING
      }
    },
    {
      paranoid: true
    }
  );
};
