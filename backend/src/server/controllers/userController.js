import { User, Article } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";

import { HTTP_STATUS_CODES } from "#root/config";

// create an user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !name || !password) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const user = await User.create({
      email,
      id: generateUUID(),
      name,
      passwordHash: hashPassword(password),
    });

    return res.status(HTTP_STATUS_CODES.CREATED).json(user);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// delete an user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if id is valid
    if (!user)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "User not found" });

    if (user.id !== req.user.id) {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN);
    }

    await user.destroy();

    return res.status(HTTP_STATUS_CODES.NO_CONTENT).send();
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// get user by id
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [{ model: Article }],
    });

    // check if user exists
    if (!user)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "User not found" });

    return res.json(user);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// get users
export const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const users = await User.findAll({ offset, limit });

  return res.json(users);
};

// update an user by id
export const updateUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !name || !password) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if user exists
    if (!user)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "User not found" });

    if (user.id !== req.user.id) {
      return res.status(HTTP_STATUS_CODES.FORBIDDEN);
    }

    user.email = email;
    user.passwordHash = hashPassword(password);
    user.name = name;

    await user.save();

    user.dataValues.passwordHash = undefined; // passwordHash excluded

    return res.json(user);
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
