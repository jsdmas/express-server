/**
 * @filename EnvHelper.js
 * @description 환경설정 파일 여부 확인
 * @author 장진호
 */

import { existsSync } from "fs";
import { join, resolve } from "path";
import { config } from "dotenv";

/**
 * @description 환경설정 파일 여부를 검사합니다.
 * @returns dotenv config
 */
function envExist() {
    const configFileName = process.env.NODE_ENV !== "production" ? ".env.server.dev" : ".env.server.production";
    /**
     * resolve() : package.json 파일까지의 경로  
     * configFileName : 상용버전/개발버전 여부
     */
    const path = join(resolve(), configFileName);

    if (!existsSync(path)) {
        try {
            throw new Error();
        } catch (e) {
            console.error(`환경설정 파일을 찾을 수 없습니다.\n환경설정 파일 경로를 확인하세요.`);
            console.error(`환경설정 파일 경로 : ${path}`);
            console.error(`프로그램 종료`);
            process.exit(1);
        }
    }
    return config({ path });
};

export default envExist;