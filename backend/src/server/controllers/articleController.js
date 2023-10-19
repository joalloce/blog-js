import { Article, Comment, User } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

// create an article
export const createArticle = async (req, res, next) => {
  try {
    const { title, content, author } = req.body;

    const article = await Article.create({
      id: generateUUID(),
      title,
      content,
      userId: author,
    });

    return res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// delete an article
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    // check if id is valid
    if (!article) return res.status(404).json({ error: "User not found" });

    await article.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get article by id
export const getArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    // check if article exists
    if (!article) return res.status(404).json({ error: "User not found" });

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get articles
export const getArticles = async (req, res, next) => {
  const users = await Article.findAll({
    include: [{ model: Comment }, { model: User, as: "author" }],
  });

  return res.json(users);
};

// update an article by id
export const updateArticle = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    const { id } = req.params;

    const article = await Article.findByPk(id);

    article.title = title;
    article.content = content;

    await article.save();

    return res.json(article);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
