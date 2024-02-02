import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useGlobalContext } from "../../Context/globalContext.js";
import IncomeItem from "../Income/IncomeItem.js";

function Expenses() {
  const { addExpense, getExpenses, deleteExpense, totalExpenses, expenses } =
    useGlobalContext();
    console.log("this is the exprense" , expenses )
  useEffect(() => {
    const fetchData = async () => {
      await getExpenses();
    };
    fetchData();
  }, [getExpenses]);

  return (
    <div className="w-full h-full">
      <div className="mt-5 md:text-start text-center">
        <h1 className="text-2xl text-purple-700 font-bold ps-3">Expenses</h1>
      </div>
      <div className="border-2 border-white rounded-md w-[96%] m-auto h-[50px] flex justify-center items-center">
        <h2 className="font-[500]">
          Total Expenses:{" "}
          <span className="text-green-500 ps-1 font-[700] text-lg">
            {totalExpenses}
          </span>
        </h2>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="md:w-[30%] w-[100%] overflow-hidden">
        <Form addData={addExpense} heading1="Expense" />
        </div>
        <div className="overflow-y-auto w-[90%] md:w-[70%] h-[550px] p-2">
          <ul>
            {expenses?.map((expense) => {
              const { _id, title, amount, date, category, description, type } =
                expense;
                console.log(type , category , "come and watch")
              return (
                <IncomeItem
                  key={_id}
                  id={_id}
                  title={title}
                  description={description}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  indicatorColor="var(--color-green)"
                  deleteItem={deleteExpense}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expenses;
