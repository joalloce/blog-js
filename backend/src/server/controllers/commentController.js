import { User, Comment } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

import { HTTP_STATUS_CODES } from "#root/config";

// create a comment
export const createComment = async (req, res, next) => {
  try {
    const { articleId, content } = req.body;

    if (!articleId || !content) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const comment = await Comment.create({
      commentableId: articleId,
      commentableType: "article",
      content,
      id: generateUUID(),
      userId: req.user.id,
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json(comment);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create a reply
export const createReply = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    if (!author || !content) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const comment = await Comment.create({
      commentableId: id,
      commentableType: "comment",
      content,
      id: generateUUID(),
      userId: req.user.id,
    });
    return res.status(HTTP_STATUS_CODES.CREATED).json(comment);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// delete a comment
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if id is valid
    if (!comment)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Comment not found" });

    if (comment.userId !== req.user.id) {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN);
    }

    await comment.destroy();

    return res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
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
    if (!comment)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Comment not found" });

    comment.dataValues.userId = undefined; // userId excluded

    return res.json(comment);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// get comments
export const getComments = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const comments = await Comment.findAll({
    include: [{ model: User, as: "author" }],
    offset,
    limit,
  });

  comments.forEach((comment) => (comment.dataValues.userId = undefined)); // userId excluded

  return res.json(comments);
};

// get replies
export const getReplies = async (req, res, next) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const comment = await Comment.findByPk(id);

    // check if comment exists
    if (!comment)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Comment not found" });

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
      offset,
      limit,
    });

    replies.forEach((reply) => (reply.dataValues.userId = undefined)); // userId excluded

    return res.json(replies);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// update a comment by id
export const updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    // check if comment exists
    if (!comment)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Comment not found" });

    if (comment.userId !== req.user.id) {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN);
    }

    comment.content = content;

    await comment.save();

    return res.json(comment);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
