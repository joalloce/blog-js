module.exports = {
  up: async (queryInterface) => {
    const generateArticlesData = (count) => {
      const articlesData = [];
      for (let i = 1; i <= count; i++) {
        const articleData = {
          id: i,
          title: `Article ${i}`,
          content: `Content for Article ${i}`,
          userId: Math.floor(Math.random() * 10) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
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
