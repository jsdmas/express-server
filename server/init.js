/**
 * @filename init.js
 * @description server, db코드를 통합하여 최종적으로 실행하는 파일
 * @author 장진호
 */

import app from "./server";
import logger from "./helper/LogHelper";
import { getIp } from "./helper/UtilHelper";

const ip = getIp();

app.listen(process.env.PORT, () => {
    logger.debug("--------------------------------------------------");
    logger.debug("|              Start Express Server              |");
    logger.debug("--------------------------------------------------");
    ip.forEach((value) => {
        logger.debug(`server address => http://${value}:${process.env.PORT}`);
    });
    logger.debug("--------------------------------------------------");
});
process.on("exit", () => logger.debug("백엔드가 종료되었습니다."));
process.on("SIGINT", () => process.exit());