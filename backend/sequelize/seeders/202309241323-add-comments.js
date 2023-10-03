const faker = require("../helpers/faker");

module.exports = {
  up: async (queryInterface) => {
    const generateCommentsData = (count) => {
      const commentsData = [];
      for (let i = 1; i <= count; i++) {
        const commentData = faker.createRandomComment({
          id: i,
          userId: Math.floor(Math.random() * 10) + 1,
          articleId: Math.floor(Math.random() * 15) + 1,
        });
        commentsData.push(commentData);
      }
      return commentsData;
    };
    const commentsData = generateCommentsData(30);
    await queryInterface.bulkInsert("comments", commentsData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
