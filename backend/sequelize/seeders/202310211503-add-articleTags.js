const faker = require("../helpers/faker");
const _ = require("lodash");

module.exports = {
  up: async (queryInterface) => {
    const generateArticleTagsData = (numArticles, numTags, maxTags) => {
      const articleTagsData = [];
      let tags = _.times(numTags, (n) => n + 1); // [1,2...numTags]
      tags = _.shuffle(tags);
      for (let i = 1; i <= numArticles; i++) {
        let tagCount = _.random(1, maxTags);
        let selectedTags = _.sampleSize(tags, tagCount);
        for (const tagId of selectedTags) {
          const articleTagData = faker.createArticleTag({
            articleId: i,
            tagId,
          });
          articleTagsData.push(articleTagData);
        }
      }
      return articleTagsData;
    };
    const articleTagsData = generateArticleTagsData(15, 5, 3);
    await queryInterface.bulkInsert("articleTags", articleTagsData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("articleTags", null, {});
  },
};
