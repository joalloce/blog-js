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

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    return res.status(500).json({ error: error.message });
  }
};

// get comment by id
export const getComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if comment exists
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

    const comment = await Comment.findByPk(id);

    // check if comment exists
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    comment.content = content;

    await comment.save();

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
