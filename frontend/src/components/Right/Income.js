import React, { useEffect } from "react";
import Form from "../Form/Form";
import { useGlobalContext } from "../../Context/globalContext.js";
import IncomeItem from "../Income/IncomeItem.js";

function Income() {
  const { incomes, getIncomes, totalIncome ,deleteIncome ,  addIncome  } = useGlobalContext();
  useEffect(() => {
    const fetchData = async () => {
      await getIncomes();
    };
    fetchData();
  }, [getIncomes]);

  return (
    <div className="w-full h-full">
      <div className="mt-5 md:text-start text-center">
        <h1 className="text-2xl text-purple-700 font-bold ps-3">Incomes </h1>
      </div>
      <div className="border-2 border-white rounded-md w-[96%] m-auto h-[50px] flex justify-center items-center">
        <h2 className="font-[500]">
          Total Income: <span className="text-green-500 ps-1 font-[700] text-lg">{totalIncome}</span>
        </h2>
      </div>
      <div className="flex md:flex-row flex-col ">
        <div className="md:w-[30%] w-[90%] overflow-hidden">
          <Form addData={addIncome} heading1="Income" />
        </div>
        <div className="overflow-y-auto  w-[90%] md:w-[70%] h-[550px] p-2">
          <ul>
            {incomes?.map((income) => {
                const {_id, title, amount, date, category, description, type} = income;
                return(
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
                    deleteItem={deleteIncome}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Income;
