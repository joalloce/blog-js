import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "#root/server/controllers/userController";

const router = express.Router();

// id params
router.delete("/:id", deleteUser);

// id params
router.get("/:id", getUser);

router.get("/", getUsers);

// id params
// email, password, name
router.patch("/:id", updateUser);

// email, password, name
router.post("/", createUser);

export default router;
