import { User } from "#root/db/models/userModel";

// create an user
export const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.create({ email, password, name });
    return res.json(user);
  } catch (e) {
    return next(e);
  }
};

// delete an user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ok = await User.destroy({ where: { id } });

    // check if id is valid
    if (!ok) return next(new Error("Invalid id"));
    return res.json(ok);
  } catch (e) {
    return next(e);
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
  } catch (e) {
    return next(e);
  }
};

// get users
export const getUsers = async (req, res, next) => {
  const users = await User.findAll();

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
  } catch (e) {
    return next(e);
  }
};
