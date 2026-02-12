import axios from "axios";
import { config } from "dotenv";
import urls from "./getUrls.js";
import logger from '../logger/logger.js';

config();

export default async function pingUrl() {
    try {
        const response = await axios.get(urls);
        logger.info(`time request: ${response.config.timeout} ms`);
        return response.data;
    } catch (error) {
        logger.error(error.message);
    }
}