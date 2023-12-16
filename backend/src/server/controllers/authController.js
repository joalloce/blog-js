import { User } from "#root/db/models";

import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";
import generateUUID from "#root/helpers/generateUUID";
import hashPassword from "#root/helpers/hashPassword";
import passwordCompareSync from "#root/helpers/passwordCompareSync";

import { HTTP_STATUS_CODES } from "#root/config";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

export const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: "Missing required fields" });
    }

    const user = await User.findOne({
      attributes: { include: ["passwordHash"] },
      where: { email },
    });

    // check if user exists
    if (!user)
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "User not found" });

    if (!passwordCompareSync(password, user.passwordHash)) {
      return res
        .status(HTTP_STATUS_CODES.NOT_FOUND)
        .json({ error: "Incorrect password" });
    }

    user.dataValues.passwordHash = undefined; // passwordHash excluded

    const token = jwt.sign(user.dataValues, JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const my = async (req, res, next) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

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

    user.dataValues.passwordHash = undefined; // passwordHash excluded

    const token = jwt.sign(user.dataValues, JWT_SECRET);

    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
