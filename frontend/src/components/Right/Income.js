import React, { useEffect } from "react";
import Form from "../Form/Form";
import { piggy, trash, circle } from "../../utils/icons.js";
import { useGlobalContext } from "../../Context/globalContext.js";

function Income() {
  const { incomes, getIncomes, totalIncome } = useGlobalContext();
  useEffect(() => {
    const fetchData = async () => {
      await getIncomes();
    };
    fetchData();
  }, [getIncomes]);

  return (
    <div className="border border-red-500  w-full h-full">
      <div className="mt-5 border border-black">
        <h1 className="text-2xl">Incomes</h1>
      </div>
      <div className="text-center h-[50px]">
        <h2>
          Total Income: <span className="text-green-500">{totalIncome}</span>
        </h2>
      </div>
      <div className="flex">
        <div className="w-[35%] overflow-hidden">
          <Form />
        </div>
        <div className="overflow-y-auto  w-[65%] h-[550px] p-2">
          <ul>
            {incomes?.map((income) => {
              return (
                <li
                  key={income._id}
                  className="flex border-2 border-white justify-between rounded-lg p-2 "
                >
                  <span>{piggy}</span>
                  <div className="flex flex-col">
                    <div className="">
                      <span>{circle}</span>
                      <span>{income.title}</span>
                    </div>
                    <div>
                      <span>{income.amount}</span>
                      <span>{income.date}</span>
                      <span>{income.description}</span>
                    </div>
                  </div>
                  <span>{trash}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Income;
