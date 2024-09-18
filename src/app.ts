import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import articleRoutes from './articles/articles.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use /api/v1 as a prefix for all routes related to articles
app.use('/api/v1', articleRoutes);

export default app;