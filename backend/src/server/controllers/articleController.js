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
    return res.json(article);
  } catch (e) {
    return next(e);
  }
};

// delete an article
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ok = await Article.destroy({ where: { id } });

    // check if id is valid
    if (!ok) return next(new Error("Invalid id"));
    return res.json(ok);
  } catch (e) {
    return next(e);
  }
};

// get article by id
export const getArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    // check if review exists
    if (!article) return next(new Error("Invalid id"));

    return res.json(article);
  } catch (e) {
    return next(e);
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

    const ok = await Article.update(
      { title, content },
      {
        where: {
          id,
        },
      }
    );

    if (!ok) return next(new Error("Invalid update"));
    return res.json(ok);
  } catch (e) {
    return next(e);
  }
};
