import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default authenticateToken;
