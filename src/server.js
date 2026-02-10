import { app } from "./app.js";
import logger from "./logger/logger.js";
import "./service/index.js";
import "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});