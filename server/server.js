/**
 * @filename server.js
 * @description express 서버 설정과 관련된 코드들을 포함한 파일입니다.
 * @author 장진호
 */

import express from "express";
import useragent from "express-useragent";
import methodOverride from "method-override";
import cors from "cors";
import envExist from "./helper/envHelper";
import { useragentLog, webHelper } from "./middlewares";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { PageNotFoundException } from "./helper/ExceptionHelper";
import userRouter from "./routers/userRouter";

const app = express();

envExist();
app.use(useragent.express());
app.use(useragentLog);

// express로 post 요청을 할때 value를 전달하기 위해 사용 (bodyParser 와 같은 역할)
// express v4.16부터 내장 라이브러리가 되었기 때문에 따로 bodyParser를 설치하지 않아도 됩니다.
app.use(express.urlencoded({ extended: true }));
// json, text 이해하기 위해 아래와 같이 작성.
app.use(express.json());
app.use(express.text());
// 다른 도메인주소끼리 요청 주고받을 때 필요.
app.use(cors());
// express로 put, delete를 사용하기위해 설정
app.use(methodOverride());
app.use(webHelper);
app.use(session({
    secret: process.env.SESSION_ENCRYPT_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        createDatabaseTable: true,
        schema: {
            tableName: "sessions",
            columnNames: {
                session_id: "session_id",
                expires: "expires",
                data: "data",
            },
        },
    })
}));


app.use("/", userRouter);

/**
 * @reactBuild
 * __dirname : /Users/jh/Documents/mysite/server
 * app.use(express.static(join(__dirname,'../build')))
 * app.use("/", serveStatic(join(__dirname, '../build/index.html')));
 * app.get('*', (_, res) => res.sendFile(join(__dirname, '../build/index.html')));
 */

// webHelper에서 확장한 함수 sendError를 통해 err 처리.
app.use((err, req, res, next) => res.sendError(err));
app.use("*", (req, res, next) => res.sendError(new PageNotFoundException()));

export default app;