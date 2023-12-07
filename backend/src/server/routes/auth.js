import express from "express";

import authenticateToken from "#root/middleware/authenticateToken";

import {
  authenticate,
  my,
  register,
} from "#root/server/controllers/authController";

const router = express.Router();

router.post("/authenticate", authenticate);

router.get("/my", authenticateToken, my);

router.post("/register", register);

export default router;
