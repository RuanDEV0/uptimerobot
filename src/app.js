import express from 'express';
import { pinoHttp } from "pino-http";
import logger from "./logger/logger.js";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pingHistory from "./service/checkPingResponse.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(pinoHttp({ logger }));

app.use(express.json());

app.get('/', async (req, res) => {
    return res.status(200).json({ message: 'Uptime Robot is running' });
});

app.get('/history/data', async (req, res) => {
    const data = pingHistory.map(entry => `<p>${entry}</p>`).join('');
    return res.status(200).end(data);
});
export { app };