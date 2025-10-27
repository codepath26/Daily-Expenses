import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import Signup from "./components/UserDeatils/singup/SignUp";
import Login from "./components/UserDeatils/login/Login";
import UseGlobalContext from "./context/GlobalContext";

export default function App() {
  const { loggedUser, loading } = UseGlobalContext();
  return (
    <>
      {loading ? (
        <h1>Loading ...</h1>
      ) : (
        <Router>
          {loggedUser ? (
            <h1>hi</h1>
          ) : (
            <Routes>
              <Route path="/" element={<Navigate to="/signup" />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
          )}
        </Router>
      )}
    </>
  );
}
