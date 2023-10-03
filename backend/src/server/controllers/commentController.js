import { Article, Comment } from "#root/db/models";

// create a comment
export const createComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const comment = await Comment.create({ content });
    return res.json(comment);
  } catch (e) {
    return next(e);
  }
};

// delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ok = await Comment.destroy({ where: { id } });

    // check if id is valid
    if (!ok) return next(new Error("Invalid id"));
    return res.json(ok);
  } catch (e) {
    return next(e);
  }
};

// get comment by id
export const getComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if review exists
    if (!comment) return next(new Error("Invalid id"));

    return res.json(comment);
  } catch (e) {
    return next(e);
  }
};

// get comments
export const getComments = async (req, res, next) => {
  const users = await Comment.findAll({
    include: [{ model: Comment }, { model: Article }],
  });

  return res.json(users);
};

// update a comment by id
export const updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const { id } = req.params;

    const ok = await Comment.update(
      { content },
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
