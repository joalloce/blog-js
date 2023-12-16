import jwt from "jsonwebtoken";

import accessEnv from "#root/helpers/accessEnv";
import { HTTP_STATUS_CODES } from "#root/config";

const JWT_SECRET = accessEnv("JWT_SECRET", "jwtsecret");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(HTTP_STATUS_CODES.UNAUTHORIZED);
    req.user = user;
    next();
  });
};

export default authenticateToken;
