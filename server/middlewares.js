/**
 * @filename middlewrares.js
 * @description server에 사용되는 middleware 함수들 모음
 * @author 장진호
 */

import logger from "./helper/LogHelper";
import { urlFormat } from "./helper/UtilHelper";

/**
 * @description user접속 기록을 log로 저장합니다.
 */
export const useragentLog = (req, res, next) => {
    logger.debug(`클라이언트 접속`);
    const beginTime = Date.now();
    const currentUrl = urlFormat({
        protocol: req.protocol,
        host: req.get("host"),
        port: req.port,
        pathname: req.originalUrl
    });
    logger.debug(`[${req.method}] ${decodeURIComponent(currentUrl)}`);
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    logger.debug(`[client] ${ip} / ${req.useragent.os} / ${req.useragent.browser} (${req.useragent.version}) / ${req.useragent.platform}`);
    res.on("finish", () => {
        const endTime = Date.now();
        const time = endTime - beginTime;
        logger.debug(`클라이언트의 접속이 종료되었습니다. ::: [runtime] ${time}ms`);
        logger.debug("--------------------------------------------------");
    });

    next();
};


/**
 * @description data전송 & error 전송을 담당하는 확장함수
 */
export const webHelper = (_, res, next) => {
    res._sendResult = (data, error = null) => {
        const json = {
            rt: "OK",
            rtcode: 200,
            rtmsg: "SUCCESS",
        };

        if (error) {
            json.rtcode = error?.code || 500;
            json.rt = error?.name || "Server Error";
            json.rtmsg = error?.message || "요청을 처리하는데 실패했습니다.";
        }

        if (data) {
            for (const item in data) {
                json[item] = data[item];
            }
        }

        // 표준시로부터 한국의 시차를 적용하여 ISO 포멧을 생성
        const offset = new Date().getTimezoneOffset() * 60 * 1000;
        const today = new Date(Date.now() - offset);
        json.pubdate = today.toISOString();

        res.header("Content-Type", "application/json; charset=utf-8");
        res.status(json.rtcode || 200).send(json);
    };

    // data를 성공적으로 전달시 실행
    res.sendResult = (data) => {
        res._sendResult(data);
    };

    // data 전송에 실패할시 실행
    res.sendError = (error) => {
        logger.error(error.stack);
        res._sendResult(null, error);
    };

    next();
};

