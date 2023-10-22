import { User, Comment } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

// create a comment
export const createComment = async (req, res, next) => {
  try {
    const { articleId, author, content } = req.body;

    const comment = await Comment.create({
      commentableId: articleId,
      commentableType: "article",
      content,
      id: generateUUID(),
      userId: author,
    });

    return res.status(201).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create a reply
export const createReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { author, content } = req.body;
    const comment = await Comment.create({
      commentableId: id,
      commentableType: "comment",
      content,
      id: generateUUID(),
      userId: author,
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

    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });

    // check if comment exists
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    comment.dataValues.userId = undefined; // userId excluded

    return res.json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get comments
export const getComments = async (req, res, next) => {
  const comments = await Comment.findAll({
    include: [{ model: User, as: "author" }],
  });

  comments.forEach((comment) => (comment.dataValues.userId = undefined)); // userId excluded

  return res.json(comments);
};

// get replies
export const getReplies = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if comment exists
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const replies = await Comment.findAll({
      where: {
        commentableType: "comment",
        commentableId: id,
      },
      include: [
        {
          model: User,
          as: "author",
        },
      ],
    });

    replies.forEach((reply) => (reply.dataValues.userId = undefined)); // userId excluded

    return res.json(replies);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
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
