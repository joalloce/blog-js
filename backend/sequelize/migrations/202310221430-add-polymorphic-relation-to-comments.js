const { NIL } = require("uuid");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface
      .addColumn("comments", "commentableType", {
        type: DataTypes.STRING,
        allowNull: false,
      })
      .then(() => {
        return queryInterface.addColumn("comments", "commentableId", {
          type: DataTypes.UUID,
          allowNull: false,
        });
      })
      .then(() => {
        return queryInterface.sequelize.query(
          `
          SELECT id, articleId
          FROM comments
          `,
          {
            type: queryInterface.sequelize.QueryTypes.SELECT,
          }
        );
      })
      .then((commentsToUpdate) => {
        const updatePromises = commentsToUpdate.map((comment) => {
          const defaultType = "article";
          return queryInterface.sequelize.query(
            `
            UPDATE comments
            SET commentableId = :articleId, commentableType = :commentableType
            WHERE id = :commentId
          `,
            {
              replacements: {
                articleId: comment.articleId,
                commentId: comment.id,
                commentableType: defaultType,
              },
            }
          );
        });
        return Promise.all(updatePromises);
      })
      .then(() => {
        return queryInterface.removeColumn("comments", "articleId");
      });
  },
  down: (queryInterface, DataTypes) =>
    queryInterface
      .addColumn("comments", "articleId", {
        allowNull: false,
        type: DataTypes.UUID,
      })
      .then(() => {
        return queryInterface.sequelize.query(
          `
          SELECT id, commentableId, commentableType
          FROM comments
        `,
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
      })
      .then((commentsToUpdate) => {
        const updatePromises = commentsToUpdate.map((comment) => {
          const articleId =
            comment.commentableType === "article" ? comment.commentableId : NIL;
          return queryInterface.sequelize.query(
            `
            UPDATE comments
            SET articleId = :articleId
            WHERE id = :commentId
          `,
            {
              replacements: {
                articleId,
                commentId: comment.id,
              },
            }
          );
        });
        return Promise.all(updatePromises);
      })
      .then(() => {
        return queryInterface.removeColumn("comments", "commentableType");
      })
      .then(() => {
        return queryInterface.removeColumn("comments", "commentableId");
      }),
};
