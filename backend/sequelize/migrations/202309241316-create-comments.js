module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "comments",
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
        articleId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: "articles",
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
  down: (queryInterface) => queryInterface.dropTable("comments"),
};
