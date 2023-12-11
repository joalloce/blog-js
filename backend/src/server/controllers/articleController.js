import { Article, Comment, User, Tag } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

// create an article
export const createArticle = async (req, res, next) => {
  try {
    const { title, content, tagIds } = req.body;

    if (!title || !content) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    const article = await Article.create({
      id: generateUUID(),
      title,
      content,
      userId: req.user.id,
    });

    if (tagIds && tagIds.length > 0) {
      await article.setTags(tagIds);
    }

    const tags = await article.getTags();

    tags.forEach((tag) => (tag.dataValues.articleTags = undefined)); // pivot excluded

    article.dataValues.tags = tags;

    return res.status(201).json(article);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

// delete an article
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    // check if id is valid
    if (!article) return res.status(404).json({ error: "Article not found" });

    if (article.userId !== req.user.id) {
      return res.status(403);
    }

    await article.setTags([]); // detach tags

    await article.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get article by id
export const getArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id, {
      include: [
        {
          model: Tag,
          through: {
            attributes: [],
          },
        },
        { model: Comment },
      ],
    });

    // check if article exists
    if (!article) return res.status(404).json({ error: "Article not found" });

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get articles
export const getArticles = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const users = await Article.findAll({
    include: [{ model: User, as: "author" }],
    offset,
    limit,
  });

  return res.json(users);
};

// update an article by id
export const updateArticle = async (req, res, next) => {
  try {
    const { title, content, tagIds } = req.body;

    if (!title || !content) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    const { id } = req.params;

    const article = await Article.findByPk(id);

    // check if article exists
    if (!article) return res.status(404).json({ error: "Article not found" });

    if (article.userId !== req.user.id) {
      return res.status(403);
    }

    article.title = title;
    article.content = content;

    await article.save();

    if (tagIds && tagIds.length > 0) {
      await article.setTags(tagIds);
    }

    const tags = await article.getTags();

    tags.forEach((tag) => (tag.dataValues.articleTags = undefined)); // pivot excluded

    article.dataValues.tags = tags;

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
