import dotenv from "dotenv";
import logger from "../logger/logger";

dotenv.config();

const data = process.env.URLS;
const urls = data.split(",");

logger.info(`Loaded URLs: ${urls}`);

