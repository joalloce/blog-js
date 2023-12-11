import { User, Article } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";

// create an user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !name || !password) {
      return res.status(422).json({ error: "Missing required fields" });
    }

    const user = await User.create({
      email,
      id: generateUUID(),
      name,
      passwordHash: hashPassword(password),
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// delete an user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if id is valid
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.id !== req.user.id) {
      return res.status(403);
    }

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
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
      return res.status(422).json({ error: "Missing required fields" });
    }

    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if user exists
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.id !== req.user.id) {
      return res.status(403);
    }

    user.email = email;
    user.passwordHash = hashPassword(password);
    user.name = name;

    await user.save();

    user.dataValues.passwordHash = undefined; // passwordHash excluded

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
