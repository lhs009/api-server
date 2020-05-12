"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserApp = sequelize.define(
    "userApp",
    {
      appId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      clientId: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false,
      },
      clientSecret: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    },
    {
      freezeTableName: true,
      tableName: "userApps",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  UserApp.associate = (db) => {
    db.UserApp.belongsTo(db.User, {
      foreignKey: "userId",
      targetKey: "userId",
    });

    db.UserApp.belongsToMany(db.ApiResource, {
      through: "appApiScopes",
      foreignKey: "appId",
      otherKey: "url",
    });
  };

  return UserApp;
};
