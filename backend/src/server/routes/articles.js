import express from "express";

import authenticateToken from "#root/middleware/authenticateToken";

import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "#root/server/controllers/articleController";

const router = express.Router();

// id params
router.delete("/:id", authenticateToken, deleteArticle);

// id params
router.get("/:id", getArticle);

router.get("/", getArticles);

// id params
// title, content, author
router.patch("/:id", authenticateToken, updateArticle);

// title, content, author
router.post("/", authenticateToken, createArticle);

export default router;
