import express from 'express';
import {
  getArticles,
  getArticleById,
  getArticleBySlug,
  createArticle,
  updateArticle,
  deleteArticle,
} from './articles.controller';

const router = express.Router();

// Routes for article CRUD operations
router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.get('/articles/:slug', getArticleBySlug);
router.post('/articles', createArticle);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
