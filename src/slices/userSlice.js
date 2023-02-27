import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getList = createAsyncThunk("UserSlice/getList", async (payload, { rejectWithValue }) => {
    let result = null;
    try {
        const { data } = await axios.get("/userlist");
        result = data;
    } catch (error) {
        console.error(error);
        result = rejectWithValue(error.response);
    }
    return result;
});

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    extraReducers: {
        [getList.pending]: (state, { payload }) => { return { ...state, loading: true }; },
        [getList.fulfilled]: (state, { payload }) => { return { data: payload.data, loading: false }; },
        [getList.rejected]: (state, { payload }) => {
            const error = new Error();
            // 만든 백엔드는 object 형태로 error를 전달한다.
            // react error : string 형태
            if (typeof payload.data === "string") {
                error.code = payload.status ? payload.status : 500;
                error.name = "React Error";
                error.message = payload.data;
            } else {
                // my backend error
                error.code = payload.data.rtcode;
                error.name = payload.data.rt;
                error.message = payload.data.rtmsg;
            }
            return { ...state, loading: false, error };
        }
    }
});

export default userSlice.reducer;