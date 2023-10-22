import express from "express";

import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  updateTag,
} from "#root/server/controllers/tagController";

const router = express.Router();

// id params
router.delete("/:id", deleteTag);

// id params
router.get("/:id", getTag);

router.get("/", getTags);

// id params
// content
router.patch("/:id", updateTag);

// content
router.post("/", createTag);

export default router;
