import { User } from "#root/db/models";

import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

export const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      attributes: {},
      where: { email },
    });

    // check if user exists
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!passwordCompareSync(password, user.passwordHash)) {
      return res.status(404).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(user, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    return res.status(201).json(true);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const my = async (req, res, next) => {
  try {
    return res.status(201).json(true);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    return res.status(201).json(true);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
