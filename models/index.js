"use strict";

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Administrator = require("./administrator")(sequelize, Sequelize);
db.Company = require("./company")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.UserApp = require("./userApp")(sequelize, Sequelize);
db.ApiResource = require("./apiResource")(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
