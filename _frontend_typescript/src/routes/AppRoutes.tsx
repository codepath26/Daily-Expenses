import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/Auth/Registed";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

const AppRoutes = ()=> {
   return <>
    {
        false ?
         <div>hey you are logged in with credentials</div>
        : (
            <Routes>
                <Route path="/" element={<Navigate to="/signup"/>}  />
                <Route path="/signup" element={<Register />}  />
                <Route path="/login" element={<Login />}  />
                <Route path="/dashboard" element = {<Dashboard />} />
            </Routes>
        )
    }
    </>
}


export default AppRoutes;