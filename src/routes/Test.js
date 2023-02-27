import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getList } from "../slices/userSlice";

const Test = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(state => state.userSlice);
    useEffect(() => {
        dispatch(getList());
    }, [dispatch]);
    console.log(data);
    return (
        loading ? "loading..." : (
            error ? JSON.stringify(error) : JSON.stringify(data)
        )
    );
};

export default Test;