const { faker } = require("@faker-js/faker");

function createRandomUser({ id }) {
  return {
    id,
    email: faker.internet.email(),
    name: faker.person.fullName(),
    passwordHash: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createRandomArticle({ id, userId }) {
  return {
    id,
    title: faker.lorem.words(),
    content: faker.lorem.paragraphs(5),
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createRandomComment({ id, articleId, userId }) {
  return {
    id,
    content: faker.lorem.sentence(),
    articleId,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createRandomTag({ id }) {
  return {
    id,
    content: getUniqueTag(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

const uniqueTags = new Set();

function getUniqueTag() {
  let tag;
  do {
    tag = faker.lorem.word();
  } while (uniqueTags.has(tag));
  uniqueTags.add(tag);
  return tag;
}

module.exports = {
  createRandomArticle,
  createRandomComment,
  createRandomUser,
  createRandomTag,
};
