"use strict";

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "company",
    {
      companyId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.STRING(100),
        unique: true,
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
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "companies",
    }
  );

  Company.associate = (db) => {
    db.Company.hasMany(db.User, {
      foreignKey: "companyId",
      sourceKey: "companyId",
    });
  };

  return Company;
};
