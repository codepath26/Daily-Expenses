import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  GlobalContextProps,
  GlobalContextProviderProps,
  IncomeTypes,
  UserState,
} from "./globalContext.type";
import axios from "axios";

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const storedUser = localStorage.getItem("expenseUser");
  const loggedUserDetails: UserState | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const [loggedUser, setLoggeduser] = useState<UserState | null>(
    loggedUserDetails
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [incomes, setIncomes] = useState<IncomeTypes[]>([]);
  const token = loggedUser?.token;
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setLoggeduser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  // User handler

  const loginHandler = useCallback((user: UserState) => {
    setLoggeduser(user);
  }, []);
  const logoutHandler = useCallback(() => {
    setLoggeduser(null);
  }, []);

  // Income Handler

  const addIncome = async (income: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/income`,
        income,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setIncomes((prevIncome) => {
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
        `${import.meta.env.VITE_BACKEND_URL}/income`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(response.data);
      setIncomes(response.data);
      const totalincomes = response.data.reduce(
        (acc: number, income: { amount: number }) => acc + income.amount,
        0
      );
      // console.log("this is the total amount of the user" , totalincomes);
      setTotalIncome(totalincomes);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  const deleteIncome = async (id: string, amount: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/income/${id}`,
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

  return (
    <GlobalContext.Provider
      value={{
        loggedUser,
        loginHandler,
        logoutHandler,
        loading,
        addIncome,
        getIncomes,
        deleteIncome,
        incomes,
        totalIncome,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const UseGlobalContext = () => {
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    throw new Error(
      "useGlobal context must be used inside the glovbalcontextProvider"
    );
  } else {
    return globalContext;
  }
};
export default UseGlobalContext;
