import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendResponse } from '../helpers/response.helper';
import TfIdf from 'tf-idf-search';

// Initialize the TfIdf instance
const tf_idf = new TfIdf();

// Initialize the PrismaClient instance
const prisma = new PrismaClient();

// Get all articles with optional TF-IDF search
export const getArticles = async (req: Request, res: Response) => {
  const query = req.query.query as string;

  try {
    const articles = await prisma.articles.findMany();

    if (query) {
      // Ensure to clear the existing corpus
      tf_idf.createCorpusFromStringArray([]);

      // Reinitialize TF-IDF with article content
      const articleContents = articles.map((article) => `${article.title} - ${article.author} - ${article.content}`);
      tf_idf.createCorpusFromStringArray(articleContents);

      // Rank articles by query
      const rankedResults = tf_idf.rankDocumentsByQuery(query);

      // Map back the ranked results to articles with scores
      const rankedArticles = rankedResults
        .filter((result: any) => result.index < articles.length)
        .map((result: any) => {
          const article = articles[result.index];
          return {
            ...article,
            score: result.similarityIndex,
          };
        });

      return sendResponse(res, true, rankedArticles, 'Articles ranked by TF-IDF');
    }

    sendResponse(res, true, articles, 'Articles fetched successfully');
  } catch (error) {
    console.error('Error fetching articles:', error);
    sendResponse(res, false, null, 'Failed to fetch articles', 500);
  }
};

// Get an article by ID
export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await prisma.articles.findUnique({ where: { id: Number(id) } });
    if (!article) {
      return sendResponse(res, false, null, 'Article not found', 404);
    }
    sendResponse(res, true, article, 'Article fetched successfully');
  } catch (error) {
    console.error('Error fetching article:', error);
    sendResponse(res, false, null, 'Failed to fetch article', 500);
  }
};

// Get an article by Slug
export const getArticleBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const article = await prisma.articles.findUnique({ where: { slug } });
    if (!article) {
      return sendResponse(res, false, null, 'Article not found', 404);
    }
    sendResponse(res, true, article, 'Article fetched successfully');
  } catch (error) {
    console.error('Error fetching article:', error);
    sendResponse(res, false, null, 'Failed to fetch article', 500);
  }
};

// Create a new article
export const createArticle = async (req: Request, res: Response) => {
  const { title, slug, short_description, author, thumbnail_img, content, published } = req.body;
  try {
    const newArticle = await prisma.articles.create({
      data: {
        title,
        slug,
        short_description,
        author,
        thumbnail_img,
        content,
        published: published ?? false,
      },
    });
    sendResponse(res, true, newArticle, 'Article created successfully', 201);
  } catch (error) {
    console.error('Error creating article:', error);
    sendResponse(res, false, null, 'Failed to create article', 500);
  }
};

// Update an existing article
export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, slug, short_description, author, thumbnail_img, content, published } = req.body;
  try {
    const updatedArticle = await prisma.articles.update({
      where: { id: Number(id) },
      data: {
        title,
        slug,
        short_description,
        author,
        thumbnail_img,
        content,
        published,
      },
    });
    sendResponse(res, true, updatedArticle, 'Article updated successfully');
  } catch (error) {
    console.error('Error updating article:', error);
    sendResponse(res, false, null, 'Failed to update article', 500);
  }
};

// Delete an article
export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.articles.delete({ where: { id: Number(id) } });
    sendResponse(res, true, null, 'Article deleted successfully', 204);
  } catch (error) {
    console.error('Error deleting article:', error);
    sendResponse(res, false, null, 'Failed to delete article', 500);
  }
};