const Sequelize = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
});

Post = sequelize.define("Posts", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING },
  details: { type: Sequelize.STRING },
  done: { type: Sequelize.BOOLEAN },
});

User.hasMany(Post, {
  foreignKey: "userId",
  targetKey: "id",
});

sequelize.sync();

module.exports = {
  User,
  Post,
};
