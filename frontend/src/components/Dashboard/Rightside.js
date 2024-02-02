import React from "react";
import MinMax from "./UI/MinMax";
import LeftRight from "./UI/LeftRight";
import { useGlobalContext } from "../../Context/globalContext";


function Rightside() {
  const { incomes, expenses, transactionHistory } = useGlobalContext();
  const minIncome = Math.min(...incomes.map((item) => item.amount));
  const maxIncome = Math.max(...incomes.map((item) => item.amount));
  const minExpense = Math.min(...expenses.map((item) => item.amount));
  const maxExpense = Math.max(...expenses.map((item) => item.amount));
  const [...history] = transactionHistory();
  return (
    <div className="flex flex-col  md:w-[40%] w-[100%] ">
      <div className="md:text-start text-center  w-full">
        <h1 className="text-purple-900  p-3 font-[600]">Recent History</h1>
      </div>
      {/* First Div */}
      <div className="w-full flex flex-col items-center">
        {history.map((item) => {
          const { _id, title, amount, type } = item;
          return (
            <LeftRight
              key={_id}
              left={title}
              right={amount}
              textColor={type === "expense" ? "red" : "green"}
            />
          );
        })}
      </div>
      {/* Second div */}
      <div className="w-full flex flex-col items-center">
        <MinMax data="Salary" />
        <LeftRight left={minIncome} right={maxIncome} textColor="red" />
        <MinMax data="Expenses" />
        <LeftRight left={minExpense} right={maxExpense} textColor="green" />
      </div>
    </div>
  );
}

export default Rightside;
