import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

export default authenticateToken;
