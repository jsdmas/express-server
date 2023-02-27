import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./routes/Test";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router