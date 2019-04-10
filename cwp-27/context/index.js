module.exports = (Sequelize, config) => {
    const options = {
        host: config.db.host,
        dialect: config.db.dialect,
        port: config.db.port,
        // logging: false,
    };

    const sequelize = new Sequelize(config.db.name, config.db.login, config.db.password, options);

    const User = require('../models/user')(Sequelize, sequelize);
    const Like = require('../models/like')(Sequelize, sequelize);
    const Tweet = require('../models/tweet')(Sequelize, sequelize);

    Tweet.belongsToMany(User, {as: 'Likes', through: Like, otherKey: 'authorId', foreignKey: 'tweetId'});
    User.hasMany(Tweet, {foreignKey: 'authorId'});
    Tweet.belongsTo(User, {foreignKey: 'authorId', as: 'author'});
  
    return {
        users: User,
        tweet: Tweet,
        like: Like,

        Sequelize,
        sequelize,
    };
};