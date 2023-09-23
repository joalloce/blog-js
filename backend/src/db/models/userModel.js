import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class User extends Model {}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    passwordHash: {
      allowNull: false,
      type: DataTypes.CHAR(64),
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    defaultScope: {
      rawAttributes: { exclude: ["passwordHash"] },
    },
    sequelize,
    modelName: "users",
  }
);
