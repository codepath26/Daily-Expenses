import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../../Context/globalContext";

function PaymentSuccess() {
  const queryData = useSearchParams()[0];
  const p = queryData.get("reference");
  const { premiumUserHandler } = useGlobalContext();

  useEffect(() => {
    premiumUserHandler();
  }, []);

  return (
    <div className="h-screen  pt-5 flex  flex-col items-center">
      <h1>Congratulation Your are Premium user Now!!</h1>
      <ul className="list-decimal">
        <li key="1">You can Check the leaderboard</li>
        <li key="2">You can Download Expenses</li>
        <li key="3">You can check the Transaction</li>
      </ul>
    </div>
  );
}

export default PaymentSuccess;
