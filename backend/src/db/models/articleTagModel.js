import { DataTypes, Model } from "sequelize";

import sequelize from "#root/db/connection";

export class ArticleTag extends Model {}

ArticleTag.init(
  {
    articleId: {
      allowNull: false,
      references: {
        key: "id",
        model: "users",
      },
      type: DataTypes.UUID,
    },
    tagId: {
      allowNull: false,
      references: {
        key: "id",
        model: "tags",
      },
      type: DataTypes.UUID,
    },
  },
  {
    sequelize,
    modelName: "articleTags",
  }
);
