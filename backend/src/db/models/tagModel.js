import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class Tag extends Model {}

Tag.init(
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
    modelName: "tags",
  }
);
