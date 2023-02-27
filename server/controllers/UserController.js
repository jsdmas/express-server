import UserServices from "../services/UserService";

export const userGetList = async (req, res, next) => {
    let data = null;
    try {
        data = await UserServices.getList();
    } catch (error) {
        return next(error);
    }
    // ★중요 {} 로 전달
    return res.sendResult({ data });
};