import sequelize from "#root/db/connection";
import { Article } from "#root/db/models/articleModel";
import { ArticleTag } from "#root/db/models/articleTagModel";
import { Comment } from "#root/db/models/commentModel";
import { Tag } from "#root/db/models/tagModel";
import { User } from "#root/db/models/userModel";

Article.hasMany(Comment, { foreignKey: "articleId" });
Comment.belongsTo(Article, { foreignKey: "articleId" });

User.hasMany(Article, { foreignKey: "userId" });
Article.belongsTo(User, { foreignKey: "userId", as: "author" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

Tag.belongsToMany(Article, { through: ArticleTag });
Article.belongsToMany(Tag, { through: ArticleTag });

export { Article, ArticleTag, Comment, Tag, User, sequelize };
