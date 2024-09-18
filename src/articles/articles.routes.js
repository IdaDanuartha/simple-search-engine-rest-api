"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articles_controller_1 = require("./articles.controller");
const router = express_1.default.Router();
// Routes for article CRUD operations
router.get('/articles', articles_controller_1.getArticles);
router.get('/articles/:id', articles_controller_1.getArticleById);
router.post('/articles', articles_controller_1.createArticle);
router.put('/articles/:id', articles_controller_1.updateArticle);
router.delete('/articles/:id', articles_controller_1.deleteArticle);
exports.default = router;
