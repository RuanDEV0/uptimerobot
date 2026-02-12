import express from 'express';
import { pinoHttp } from "pino-http";
import logger from "./logger/logger.js";
// import './service/pingUrl.js'
// import sendEmail from "./service/sendEmail.js";
import pingUrl from "./service/pingUrl.js";

const app = express();

app.use(pinoHttp({ logger}));

app.use(express.json());

app.get('/', async (req, res) => {
    const data = await pingUrl();
    res.send(data);
});

export { app };
