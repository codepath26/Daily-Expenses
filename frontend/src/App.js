import Left from "./components/Left/Left.js";
import MovingBackground from "./components/MovingBackgroud/MovingBackground.js";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Right/Dashboard.js";
import Income from "./components/Right/Income.js";
import Transactions from "./components/Right/Transaction.js";
import Expenses from "./components/Right/Expenses.js";
import PaymentSuccess from "./components/PremiumUser/PaymentSuccess.js";
import Leaderboard from "./components/Leaderboard/Leaderboard.js";
import Welcome from "./components/Welcome.js";

function App() {
  return (
    <>
      <Router>
        <MovingBackground />
        <div
          className={`p-2 flex md:flex-row flex-col w-full md:h-screen overflow-auto md:overflow-hidden`}
        >
          <Left />
          <div className="md:w-[90%] w-full relative  pt-3 md:pt-0 md:m-4  mx-auto">
            <div className="border-[3px] border-white bg-gray-200 bg-opacity-80  rounded-[20px]">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/deshboard" element={<Dashboard />} />
                <Route path="/income" element={<Income />} />
                <Route path="/transaction" element={<Transactions />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/paymentsuccess" element={<PaymentSuccess />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="*" element={<Welcome />} />
                <Route />
                <Route />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;

// className={`md:w-screen md:h-screen overflow-y-scroll scroll-smooth md:overflow-y-hidden md:m-0 m-1 flex transition-all md:flex-row flex-col md:flex-nowrap flex-wrap duration-500 bg-gray-300 container`}
