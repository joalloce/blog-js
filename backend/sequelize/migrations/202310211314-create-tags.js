module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable(
      "tags",
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
  down: (queryInterface) => queryInterface.dropTable("tags"),
};
