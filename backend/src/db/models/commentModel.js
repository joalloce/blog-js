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
    commentableType: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    commentableId: {
      allowNull: false,
      type: DataTypes.UUID,
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
    modelName: "comments",
  }
);
