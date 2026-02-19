import logger from "../logger/logger.js";
import pingUrl from "./pingIp.js";
import sendEmail from "./sendEmail.js";


var pingHistory = [];

async function checkPingResponse() {
    const interval = process.env.CHECK_INTERVAL || 30000;
    var response = null;
    try {
        response = await pingUrl();
        logger.info(`PING ${response.host}`);
    
        if (!response.alive || response.statusHttp === "Offline") {
            await sendEmail(response.url, response.service, null, "offline");
        }
        else if (response.timeHttp > 10) { 
            await sendEmail(response.url, response.service, response.timeHttp, "http lento");
        }

    } catch (error) {
        logger.error("Error in check ping response: " + error.message);
    } finally {
        pingHistory.push(`${await getDateTimeLocal()} - Servico: ${response ? response.service : "Unknown"}, TempoIp: ${response ? response.time : "Unknown"}, StatusIp: ${response ? (response.alive ? "Online" : "Offline") : "Error"}, StatusHttp: ${response ? response.statusHttp : "Unknown"}, TempoHttp: ${response ? response.timeHttp : "Unknown"}`);
        setTimeout(checkPingResponse, interval);

        if (pingHistory.length == 2880) {
            pingHistory.length = 0; // Limpa o histórico após 24 horas (2880 registros para intervalos de 30 segundos)
        }
    }
}

async function getDateTimeLocal() {
    const now = new Date();
    const localDateTimeString = now.toLocaleString();
    return localDateTimeString;
}

checkPingResponse();
export default pingHistory;