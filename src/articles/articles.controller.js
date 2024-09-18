"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteArticle = exports.updateArticle = exports.createArticle = exports.getArticleById = exports.getArticles = void 0;
const client_1 = require("@prisma/client");
const response_helper_1 = require("../helpers/response.helper");
const tf_idf_search_1 = __importDefault(require("tf-idf-search"));
// Initialize the TfIdf instance
const tf_idf = new tf_idf_search_1.default();
// Initialize the PrismaClient instance
const prisma = new client_1.PrismaClient();
// Get all articles with optional TF-IDF search
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    try {
        const articles = yield prisma.articles.findMany();
        if (query) {
            // Ensure to clear the existing corpus
            tf_idf.createCorpusFromStringArray([]);
            // Reinitialize TF-IDF with article content
            const articleContents = articles.map((article) => article.content);
            tf_idf.createCorpusFromStringArray(articleContents);
            // Rank articles by query
            const rankedResults = tf_idf.rankDocumentsByQuery(query);
            // Map back the ranked results to articles with scores
            const rankedArticles = rankedResults
                .filter((result) => result.index < articles.length)
                .map((result) => {
                const article = articles[result.index];
                return Object.assign(Object.assign({}, article), { score: result.similarityIndex });
            });
            return (0, response_helper_1.sendResponse)(res, true, rankedArticles, 'Articles ranked by TF-IDF');
        }
        (0, response_helper_1.sendResponse)(res, true, articles, 'Articles fetched successfully');
    }
    catch (error) {
        console.error('Error fetching articles:', error);
        (0, response_helper_1.sendResponse)(res, false, null, 'Failed to fetch articles', 500);
    }
});
exports.getArticles = getArticles;
// Get an article by ID
const getArticleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const article = yield prisma.articles.findUnique({ where: { id: Number(id) } });
        if (!article) {
            return (0, response_helper_1.sendResponse)(res, false, null, 'Article not found', 404);
        }
        (0, response_helper_1.sendResponse)(res, true, article, 'Article fetched successfully');
    }
    catch (error) {
        console.error('Error fetching article:', error);
        (0, response_helper_1.sendResponse)(res, false, null, 'Failed to fetch article', 500);
    }
});
exports.getArticleById = getArticleById;
// Create a new article
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, short_description, author, thumbnail_img, content, published } = req.body;
    try {
        const newArticle = yield prisma.articles.create({
            data: {
                title,
                short_description,
                author,
                thumbnail_img,
                content,
                published: published !== null && published !== void 0 ? published : false,
            },
        });
        (0, response_helper_1.sendResponse)(res, true, newArticle, 'Article created successfully', 201);
    }
    catch (error) {
        console.error('Error creating article:', error);
        (0, response_helper_1.sendResponse)(res, false, null, 'Failed to create article', 500);
    }
});
exports.createArticle = createArticle;
// Update an existing article
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, short_description, author, thumbnail_img, content, published } = req.body;
    try {
        const updatedArticle = yield prisma.articles.update({
            where: { id: Number(id) },
            data: {
                title,
                short_description,
                author,
                thumbnail_img,
                content,
                published,
            },
        });
        (0, response_helper_1.sendResponse)(res, true, updatedArticle, 'Article updated successfully');
    }
    catch (error) {
        console.error('Error updating article:', error);
        (0, response_helper_1.sendResponse)(res, false, null, 'Failed to update article', 500);
    }
});
exports.updateArticle = updateArticle;
// Delete an article
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.articles.delete({ where: { id: Number(id) } });
        (0, response_helper_1.sendResponse)(res, true, null, 'Article deleted successfully', 204);
    }
    catch (error) {
        console.error('Error deleting article:', error);
        (0, response_helper_1.sendResponse)(res, false, null, 'Failed to delete article', 500);
    }
});
exports.deleteArticle = deleteArticle;
