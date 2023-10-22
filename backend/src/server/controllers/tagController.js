import { Article, Tag } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";

// create a tag
export const createTag = async (req, res, next) => {
  try {
    const { content } = req.body;

    const tag = await Tag.create({
      id: generateUUID(),
      content,
    });

    return res.status(201).json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete a tag
export const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    // check if id is valid
    if (!tag) return res.status(404).json({ error: "Tag not found" });

    await tag.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    if (!tag) return res.status(404).json({ error: "Tag not found" });

    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// get tags
export const getTags = async (req, res, next) => {
  const tags = await Tag.findAll();

  return res.json(tags);
};

// update a tag by id
export const updateTag = async (req, res, next) => {
  try {
    const { content } = req.body;

    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    // check if tag exists
    if (!tag) return res.status(404).json({ error: "Tag not found" });

    tag.content = content;

    await tag.save();

    return res.json(tag);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
