module.exports = async function (db) {
    await db.sequelize.sync({force: true});
  
    await db.user.bulkCreate([
        {
            email: "ikonov@1",
            password: "$2a$10$i.zitMeIJf1yvLPYfwOft.YzbgeRUXI5UpmXuUfDSOUZ0Vo1mY/8u",
            codes: "[12345,54321,44444,21543]"
        }
    ]);
  };