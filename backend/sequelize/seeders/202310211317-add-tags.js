const faker = require("../helpers/faker");

module.exports = {
  up: async (queryInterface) => {
    const generateTagsData = (numTags) => {
      const tagsData = [];
      for (let i = 1; i <= numTags; i++) {
        const tagData = faker.createRandomTag({
          id: i,
        });
        tagsData.push(tagData);
      }
      return tagsData;
    };
    const tagsData = generateTagsData(5);
    await queryInterface.bulkInsert("tags", tagsData, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
