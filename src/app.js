import express from 'express';
import { pinoHttp } from "pino-http";
import logger from "./logger/logger.js";

const app = express();

app.use(pinoHttp(logger));

app.use(express.json());

export { app };
