import dotenv from "dotenv";
import logger from "../logger/logger.js";

dotenv.config();

const data = JSON.parse(process.env.HOST);

export default data;
