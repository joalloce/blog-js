module.exports = {
  up: (queryInterface, DataTypes) =>
    queryInterface
      .removeColumn("comments", "articleId")
      .then(() => {
        queryInterface.addColumn("comments", "commentableType", {
          type: DataTypes.STRING,
          allowNull: false,
        });
      })
      .then(() => {
        return queryInterface.addColumn("comments", "commentableId", {
          type: DataTypes.UUID,
          allowNull: false,
        });
      }),
  down: (queryInterface, DataTypes) =>
    queryInterface
      .addColumn("comments", "articleId", {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: "articles",
          key: "id",
        },
      })
      .then(() => {
        return queryInterface.removeColumn("comments", "commentableType");
      })
      .then(() => {
        return queryInterface.removeColumn("comments", "commentableId");
      }),
};
