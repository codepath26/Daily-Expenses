import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [totalIncome , setTotalIncome] = useState(0);

  const addIncome = async (income) => {
    try {
      console.log("this is the income object", income);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/income`,
        income
      );
      setIncomes((prevIncome) => {
        // return prevIncome.push(response.data.income);
        return [...prevIncome , response.data.income]
      });
      setTotalIncome(prev => prev + response.data.income.amount);
      console.log("this is the added income", incomes);
    } catch (error) {
      console.log(error);
    }
  };
  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income`
      );
      console.log(response.data);
      setIncomes(response.data);
      const totalincomes = response.data.reduce((acc,income)=> acc + income.amount , 0);
      // console.log("this is the total amount of the user" , totalincomes);
      setTotalIncome(totalincomes);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        // deleteIncomes,
        // expenses,
        totalIncome,
        // addExpense,
        // getExpense,
        // deleteExpense,
        // totalExpenses,
        // totalBalance,
        // transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
