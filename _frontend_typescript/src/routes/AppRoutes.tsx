import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Auth/Registed";

const AppRoutes = ()=> {
   return <>
    {
        false ?
         <div>hey you are logged in with credentials</div>
        : (
            <Routes>
                <Route path="/" element={<Navigate to="/signup"/>}  />
                <Route path="/signup" element={<Register />}  />
            </Routes>
        )
    }
    </>
}


export default AppRoutes;