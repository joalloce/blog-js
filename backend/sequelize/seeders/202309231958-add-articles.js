const faker = require("../helpers/faker");

module.exports = {
  up: async (queryInterface) => {
    const generateArticlesData = (count) => {
      const articlesData = [];
      for (let i = 1; i <= count; i++) {
        const articleData = faker.createRandomArticle(
          i,
          Math.floor(Math.random() * 10) + 1
        );
        articlesData.push(articleData);
      }
      return articlesData;
    };
    const articlesData = generateArticlesData(15);
    await queryInterface.bulkInsert("articles", articlesData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("articles", null, {});
  },
};
