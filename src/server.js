import { app } from "./app.js";
import logger from "./logger/logger.js";
import dotenv from "dotenv";
import "./service/checkPingResponse.js";

dotenv.config();

const PORT = process.env.PORT_SERVER || 3000;

app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
});