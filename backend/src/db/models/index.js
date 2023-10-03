import sequelize from "#root/db/connection";
import { Article } from "#root/db/models/articleModel";
import { User } from "#root/db/models/userModel";
import { Comment } from "#root/db/models/CommentModel";

Article.hasMany(Comment, { foreignKey: "articleId" });
Comment.belongsTo(Article, { foreignKey: "articleId" });

User.hasMany(Article, { foreignKey: "userId" });
Article.belongsTo(User, { foreignKey: "userId", as: "author" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });

export { Article, Comment, User, sequelize };
