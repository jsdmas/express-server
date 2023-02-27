/**
 * @filename LogHelper.js
 * @description Log생성 Helper
 * @author 장진호
 */

import { format, createLogger, transports } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import envExist from "./envHelper.js";
import { mkdirs } from "./FileHelper";

envExist();
mkdirs(process.env.LOG_PATH);
const { combine, timestamp, printf, splat, colorize } = format;

/** winston 객체 생성 */
const logger = createLogger({
    // 로그 전반적인 형식
    format: combine(
        timestamp({ format: "YY/MM/DD HH:mm:ss SSS" }),
        printf(({ timestamp, level, message }) => `${timestamp} : [${level}] : ${message}`),
        splat()
    ),
    // 일반 로그 규칙 정의
    transports: [
        // 하루에 하나씩
        new winstonDaily({
            name: "log",
            level: process.env.LOG_LEVEL, //로그 level
            datePattern: "YYMMDD", // 파일 이름에 표시될 날짜 형식
            dirname: process.env.LOG_PATH, // 파일이 저장될 위치
            filename: "log_%DATE%.log", // 파일이름 형식
            maxSize: 5000_0000, // byte (50Mb)
            maxFiles: 50,
            zippedArchive: true, //압축여부
        })
    ]
});

/** 콘솔 설정 */
if (process.env.NODE_ENV !== "production") {
    // dev 버전일시 콘솔에 값 출력
    logger.add(
        new transports.Console({
            prettyPrint: true,
            showLevel: true,
            level: process.env.LOG_LEVEL,
            format: combine(
                colorize({ all: true }),
                printf(({ timestamp, level, message }) => `${timestamp} : [${level}] : ${message}`)
            ),
        })
    );
}

export default logger;

