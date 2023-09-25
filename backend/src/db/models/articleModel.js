import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class Article extends Model {}

Article.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    modelName: "articles",
  }
);
