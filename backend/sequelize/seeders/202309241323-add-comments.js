module.exports = {
  up: async (queryInterface) => {
    const generateCommentsData = (count) => {
      const commentsData = [];
      for (let i = 1; i <= count; i++) {
        const commentData = {
          id: i,
          content: `Content for Comment ${i}`,
          articleId: Math.floor(Math.random() * 15) + 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
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
