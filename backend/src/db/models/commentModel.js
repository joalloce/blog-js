import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class Comment extends Model {}

Comment.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "comments",
  }
);
