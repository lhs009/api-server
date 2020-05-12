"use strict";

module.exports = (sequelize, DataTypes) => {
  const ApiResource = sequelize.define(
    "apiResources",
    {
      url: {
        type: DataTypes.STRING(200),
        primaryKey: true,
        allowNull: false,
      },
      apiName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      tableName: "apiResources",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  ApiResource.associate = (db) => {
    db.ApiResource.belongsToMany(db.UserApp, {
      through: "appApiScopes",
      foreignKey: "url",
      otherKey: "appId",
    });
  };

  return ApiResource;
};
