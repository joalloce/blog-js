const faker = require("../helpers/faker");
const _ = require("lodash");

module.exports = {
  up: async (queryInterface) => {
    const generateCommentsData = (numComments, maxReplies) => {
      const commentsData = [];
      let repliesId = numComments + 1;
      for (let i = 1; i <= numComments; i++) {
        const commentData = faker.createRandomComment({
          id: i,
          userId: Math.floor(Math.random() * 10) + 1,
          commentableId: Math.floor(Math.random() * 15) + 1,
          commentableType: "article",
        });
        commentsData.push(commentData);
        let repliesCount = _.random(0, maxReplies);
        for (let j = 0; j < repliesCount; j++) {
          const replyData = faker.createRandomComment({
            id: repliesId,
            userId: Math.floor(Math.random() * 10) + 1,
            commentableId: i,
            commentableType: "comment",
          });
          repliesId++;
          commentsData.push(replyData);
        }
      }
      return commentsData;
    };
    const commentsData = generateCommentsData(30, 5);
    await queryInterface.bulkInsert("comments", commentsData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
