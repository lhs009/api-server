"use strict";

module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define(
    "administrator",
    {
      adminId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      loginId: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
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
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "administrators",
    }
  );

  Administrator.associate = (db) => {};

  return Administrator;
};
