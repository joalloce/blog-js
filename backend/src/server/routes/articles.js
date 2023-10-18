import express from "express";

import {
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "#root/server/controllers/articleController";

const router = express.Router();

// id params
router.delete("/:id", deleteArticle);

// id params
router.get("/:id", getArticle);

router.get("/", getArticles);

// id params
// title, content, author
router.patch("/:id", updateArticle);

// title, content, author
router.post("/", createArticle);

export default router;
