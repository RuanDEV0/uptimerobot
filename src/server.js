import { app } from "./app.js";
import logger from "./logger/logger.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT_SERVER || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});