import { config } from "dotenv";
import urls from "./getIp.js";
import logger from '../logger/logger.js';
import axios from "axios";

config();

export default async function pingUrl() {
    try {
        const data = await checkHttp();
        data.host = urls.url;
        data.service = urls.service;
        return data;
    } catch (error) {
        logger.error(error.message);
    }
}

async function checkHttp() {
    try {
        const start = Date.now();
        const response = await axios.get(urls.url);

        const time = Number(((Date.now() - start) / 1000).toFixed(3));
        
        return {
            status: response.status,
            time: time,
        }
    } catch (error) {
        logger.error(error.message);
        return {
            status: null,
            time: null
        };
    }
}