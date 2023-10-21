module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "articleTags",
      {
        articleId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: "articles",
            key: "id",
          },
        },
        tagId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: "tags",
            key: "id",
          },
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
        charset: "utf8",
      }
    );
  },
  down: (queryInterface) => queryInterface.dropTable("articleTags"),
};
