import ping from "ping";
import { config } from "dotenv";
import urls from "./getIp.js";
import logger from '../logger/logger.js';
import axios from "axios";

config();

export default async function pingUrl() {
    try {
        const data = await checkHttp();
        const response = await ping.promise.probe(urls.ip);

        response.time = parseFloat((response.time ) / 1000).toFixed(3);
        response.url = urls.url;
        response.service = urls.service;
        response.statusHttp = data.status;
        response.timeHttp = data.time;

        return response;
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