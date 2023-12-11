import express from "express";

import authenticateToken from "#root/middleware/authenticateToken";

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
router.delete("/:id", authenticateToken, deleteComment);

// id params
router.get("/:id", getComment);

router.get("/", getComments);

// id params
// content
router.patch("/:id", authenticateToken, updateComment);

// articleId, content
router.post("/", authenticateToken, createComment);

// id params
router.post("/:id/replies", authenticateToken, createReply);

// id params
router.get("/:id/replies", getReplies);

export default router;
