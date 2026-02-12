import axios from "axios";
import { config } from "dotenv";
import urls from "./getUrls.js";
import logger from '../logger/logger.js';

config();

export async function pingUrl() {
    const logsResponse = []; 
    urls.forEach(async (url) => {
        try {
            const response = await axios.get(url);
            logsResponse.push(response);
        } catch (error) {
            logger.error(error);
        } finally {
             logger.info("Quantidade de logs: " + logsResponse.length);
        }
    });
    return logsResponse
}