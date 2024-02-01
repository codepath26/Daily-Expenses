import React from "react";
import Dashboard from "./Dashboard.js";
import Expenses from "./Expenses.js";
import Income from "./Income.js";
import Transactions from "./Transaction.js";

function Righinnder({active}) {
  switch (active) {
    case 1:
      return <Dashboard />;
    case 2:
      return <Transactions />;
    case 3:
      return <Income />;
    case 4:
      return <Expenses />;
    default:
      return <Dashboard />;
  }
}

export default Righinnder;
