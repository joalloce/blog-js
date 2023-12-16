import { Article, Tag } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

import { HTTP_STATUS_CODES } from "#root/config";

// create a tag
export const createTag = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const tag = await Tag.create({
      id: generateUUID(),
      content,
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json(tag);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// delete a tag
export const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    // check if id is valid
    if (!tag)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Tag not found" });

    await tag.destroy();

    return res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// get tag by id
export const getTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id, {
      include: [
        {
          model: Article,
          through: {
            attributes: [],
          },
        },
      ],
    });

    // check if tag exists
    if (!tag)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Tag not found" });

    return res.json(tag);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// get tags
export const getTags = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const tags = await Tag.findAll({ offset, limit });

  return res.json(tags);
};

// update a tag by id
export const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    if (!content) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const tag = await Tag.findByPk(id);

    // check if tag exists
    if (!tag)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Tag not found" });

    tag.content = content;

    await tag.save();

    return res.json(tag);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
