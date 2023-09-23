module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "articles",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
        },
        title: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        content: {
          allowNull: false,
          type: DataTypes.TEXT,
        },
        userId: {
          allowNull: false,
          type: DataTypes.UUID,
          references: {
            model: "users",
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
  down: (queryInterface) => queryInterface.dropTable("articles"),
};
