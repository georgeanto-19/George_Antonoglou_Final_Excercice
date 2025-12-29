// backend/src/app.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import indexRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mount API routes under /api
app.use('/api', indexRouter);

// Health route (keep in app or move to http)
app.get('/health', (req, res) => res.json({ ok: true }));


export default app;