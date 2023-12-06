import { User, Article } from "#root/db/models";

import passwordCompareSync from "#root/helpers/passwordCompareSync";

import accessEnv from "#root/helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

export const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    return res.status(201).json(true);
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
