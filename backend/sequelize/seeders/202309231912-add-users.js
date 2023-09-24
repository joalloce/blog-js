module.exports = {
  up: async (queryInterface) => {
    const generateUsersData = (count) => {
      const usersData = [];
      for (let i = 1; i <= count; i++) {
        const userData = {
          id: i,
          name: `user${i}`,
          email: `user${i}@example.com`,
          passwordHash: `password${i}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
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
