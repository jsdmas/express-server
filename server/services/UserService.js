import MybatisMapper from "mybatis-mapper";
import DBPool from "../DBPool";
import { RuntimeException } from "../helper/ExceptionHelper";

class UserService {
    constructor() {
        MybatisMapper.createMapper(["./server/mappers/UserMapper.xml"]);
    }

    async getList(params) {
        let dbcon = null;
        let data = null;

        try {
            dbcon = await DBPool.getConnection();
            let sql = MybatisMapper.getStatement("UserMapper", "selectList", params);
            // mapper로 작성한 sql문 실행 후 결과 받기
            let [result] = await dbcon.query(sql);
            if (result.length === 0) {
                throw new RuntimeException("조회된 데이터가 없습니다.");
            }
            data = result;
        } catch (error) {
            throw error;
        } finally {
            if (dbcon) { dbcon.release(); }
        }
        return data;
    }
}
const UserServices = new UserService();

export default UserServices;
