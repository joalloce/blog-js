import express from "express";

import {
  createComment,
  deleteComment,
  getComment,
  getComments,
  updateComment,
} from "#root/server/controllers/commentController";

const router = express.Router();

// id params
router.delete("/:id", deleteComment);

// id params
router.get("/:id", getComment);

router.get("/", getComments);

// id params
// title, content, author
router.patch("/:id", updateComment);

// title, content
router.post("/", createComment);

export default router;
