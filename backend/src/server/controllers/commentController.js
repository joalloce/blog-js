import { Article, User, Comment } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

// create a comment
export const createComment = async (req, res, next) => {
  try {
    const { articleId, author, content } = req.body;

    const comment = await Comment.create({
      articleId,
      userId: author,
      id: generateUUID(),
      content,
    });

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if id is valid
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    await comment.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get comments
export const getComments = async (req, res, next) => {
  const comments = await Comment.findAll({
    include: [{ model: User, as: "author" }, { model: Article }],
  });

  return res.json(comments);
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
  } catch (error) {
    return res.status(500).json({ error });
  }
};
