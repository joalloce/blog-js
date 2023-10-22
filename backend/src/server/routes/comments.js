import express from "express";

import {
  createComment,
  createReply,
  deleteComment,
  getComment,
  getComments,
  getReplies,
  updateComment,
} from "#root/server/controllers/commentController";

const router = express.Router();

// id params
router.delete("/:id", deleteComment);

// id params
router.get("/:id", getComment);

router.get("/", getComments);

// id params
// content
router.patch("/:id", updateComment);

// articleId, content, author
router.post("/", createComment);

// id params
router.post("/:id/replies", createReply);

// id params
router.get("/:id/replies", getReplies);

export default router;
