import express from "express";

import authenticateToken from "#root/middleware/authenticateToken";

import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "#root/server/controllers/tagController";

const router = express.Router();

// id params
router.delete("/:id", authenticateToken, deleteTag);

// id params
router.get("/:id", getTag);

router.get("/", getTags);

// id params
// content
router.patch("/:id", authenticateToken, updateTag);

// content
router.post("/", authenticateToken, createTag);

export default router;
