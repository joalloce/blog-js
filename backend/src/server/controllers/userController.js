import { User, Article } from "#root/db/models";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

// create an user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({
      email,
      id: generateUUID(),
      name,
      passwordHash: hashPassword(password),
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// delete an user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if id is valid
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get user by id
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    // check if review exists
    if (!user) return next(new Error("Invalid id"));

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// get users
export const getUsers = async (req, res, next) => {
  const users = await User.findAll({
    include: [{ model: Article }],
  });

  return res.json(users);
};

// update an user by id
export const updateUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const { id } = req.params;

    const ok = await User.update(
      { email, password, name },
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
