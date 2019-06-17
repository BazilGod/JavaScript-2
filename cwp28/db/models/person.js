module.exports = (Sequelize, sequelize) => {
  return sequelize.define('Person', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {type:Sequelize.STRING},
    address: {type:Sequelize.STRING},
    isAlive: {type:Sequelize.BOOLEAN}
  });
};
