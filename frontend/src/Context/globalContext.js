import { createContext, useCallback, useContext, useState } from "react";
import axios from "axios";
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const isUserPremium = localStorage.getItem("expensePremium");
  const loggedUserDetails =
    JSON.parse(localStorage.getItem("expenseUser")) || null;
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [isPremium, setIsPremium] = useState(!!isUserPremium);
  const [loggedUser, setLoggeduser] = useState(loggedUserDetails);
  const token = loggedUser?.token;
  console.log(typeof loggedUser);
  //  income Handlers

  const premiumUserHandler = () => {
    localStorage.setItem("expensePremium", true);
    setIsPremium(true);
  };
  const loginHandler = useCallback((user) => {
    setLoggeduser(user);
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("expenseUser");

    setLoggeduser(null);
  };

  const addIncome = async (income) => {
    try {
      // console.log("this is the income object", income);
      // console.log(token);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/income`,
        income,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIncomes((prevIncome) => {
        // return prevIncome.push(response.data.income);
        return [response.data.income, ...prevIncome];
      });
      setTotalIncome((prev) => prev + response.data.income.amount);
      // console.log("this is the added income", incomes);
    } catch (error) {
      console.log(error);
    }
  };
  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/income`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data);
      setIncomes(response.data);
      const totalincomes = response.data.reduce(
        (acc, income) => acc + income.amount,
        0
      );
      // console.log("this is the total amount of the user" , totalincomes);
      setTotalIncome(totalincomes);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const deleteIncome = async (id, amount) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/income/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      setIncomes((prev) => {
        return prev.filter((income) => {
          return income._id !== id;
        });
      });
      setTotalIncome((prev) => prev - amount);
    } catch (error) {
      console.log(error);
    }
  };

  // Expense Handler

  const addExpense = async (expense) => {
    try {
      // console.log("this is the income object", expense) ;
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/expense`,
        expense,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setExpenses((prevExpense) => {
        // return prevIncome.push(response.data.income);
        return [response.data.expense, ...prevExpense];
      });

      setTotalExpenses((prev) => prev + response.data.expense.amount);
      // console.log("this is the added income", expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenses = useCallback(async () => {
    try {
      console.log(token, "thisi si the token from getexpense");
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/expense`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log("this  is data i got", response.data);
      setExpenses(response.data);
      const FetchtotalExpenses = response.data.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );
      setTotalExpenses(FetchtotalExpenses);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }, [token]);

  const deleteExpense = async (id, amount) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/expense/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log(response.data);
      setExpenses((prev) => {
        return prev.filter((expense) => {
          return expense._id !== id;
        });
      });
      setTotalExpenses((prev) => prev - amount);
    } catch (error) {
      console.log(error);
    }
  };

  const totalBalance = () => {
    return totalIncome - totalExpenses;
  };
  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 3);
  };
  console.log("global context render");
  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        loggedUser,
        loginHandler,
        logoutHandler,
        isPremium,
        premiumUserHandler,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
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
