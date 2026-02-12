import logger from "../logger/logger.js";
import dotenv from "dotenv";

dotenv.config();

const data = process.env.URLS;
const urls = [];

for (const url of data.split(",")) {
    urls.push(url.trim());
}

export default urls;
