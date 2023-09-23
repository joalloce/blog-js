module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER.UNSIGNED,
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users"); // Corrected table name from "reviews" to "users"
  },
};
