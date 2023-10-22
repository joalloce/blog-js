const faker = require("../helpers/faker");

module.exports = {
  up: async (queryInterface) => {
    const generateUsersData = (numUsers) => {
      const usersData = [];
      for (let i = 1; i <= numUsers; i++) {
        const userData = faker.createRandomUser({ id: i });
        usersData.push(userData);
      }
      return usersData;
    };
    const usersData = generateUsersData(10);
    await queryInterface.bulkInsert("users", usersData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
