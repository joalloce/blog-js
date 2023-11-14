import express from "express";

import {
  authenticate,
  logout,
  my,
  register,
} from "#root/server/controllers/authController";

const router = express.Router();

router.post("/authenticate", authenticate);

router.get("/logout", logout);

router.get("/my", my);

router.post("/register", register);

export default router;
