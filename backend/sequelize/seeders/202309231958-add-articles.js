const faker = require("../helpers/faker");

module.exports = {
  up: async (queryInterface) => {
    const generateArticlesData = (numArticles) => {
      const articlesData = [];
      for (let i = 1; i <= numArticles; i++) {
        const articleData = faker.createRandomArticle({
          id: i,
          userId: Math.floor(Math.random() * 10) + 1,
        });
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
