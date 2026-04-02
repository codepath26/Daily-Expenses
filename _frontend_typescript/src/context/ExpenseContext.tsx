import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import axios from "axios";

interface Income {
  _id: string;
  amount: number;
  createdAt: string;
}

interface Expense {
  _id: string;
  amount: number;
  createdAt: string;
}

interface User {
  token: string;
}

interface GlobalContextType {
  incomes: Income[];
  expenses: Expense[];
  totalIncome: number;
  totalExpenses: number;
  error: string | null;
  loggedUser: User | null;
  leaderboard: any;
  isPremium: boolean;

  addIncome: (income: any) => Promise<void>;
  getIncomes: () => Promise<void>;
  deleteIncome: (id: string, amount: number) => Promise<void>;

  addExpense: (expense: any) => Promise<void>;
  getExpenses: () => Promise<void>;
  deleteExpense: (id: string, amount: number) => Promise<void>;

  totalBalance: () => number;
  transactionHistory: () => (Income | Expense)[];
}

const GlobalContext = createContext<GlobalContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const GlobalContextProvider = ({ children }: Props) => {

  const isUserPremium = localStorage.getItem("expensePremium");

  const loggedUserDetails: User | null =
    JSON.parse(localStorage.getItem("expenseUser") || "null");

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [isPremium, setIsPremium] = useState<boolean>(Boolean(isUserPremium));
  const [loggedUser, setLoggeduser] = useState<User | null>(loggedUserDetails);
  const [leaderboard, setLeaderboard] = useState<any>(null);

  const token = loggedUser?.token;
  const API_URL = import.meta.env.VITE_API_URL as string;

  const leaderboardHandler = useCallback((data: any) => {
    setLeaderboard(data);
  }, []);

  const premiumUserHandler = () => {
    localStorage.setItem("expensePremium", "true");
    setIsPremium(true);
  };

  const loginHandler = useCallback((user: User) => {
    setLoggeduser(user);
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("expenseUser");
    localStorage.removeItem("expensePremium");
    setLoggeduser(null);
  };

  // ---------- Income ----------

  const addIncome = async (income: any): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_URL}/income`,
        income,
        { headers: { Authorization: token } }
      );

      setIncomes((prev) => [response.data.income, ...prev]);
      setTotalIncome((prev) => prev + response.data.income.amount);

    } catch (error) {
      console.error(error);
    }
  };

  const getIncomes = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(
        `${API_URL}/income`,
        { headers: { Authorization: token } }
      );

      setIncomes(response.data);

      const total = response.data.reduce(
        (acc: number, income: Income) => acc + income.amount,
        0
      );

      setTotalIncome(total);

    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const deleteIncome = async (id: string, amount: number): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/income/${id}`,
        { headers: { Authorization: token } }
      );

      setIncomes((prev) => prev.filter((income) => income._id !== id));
      setTotalIncome((prev) => prev - amount);

    } catch (error) {
      console.error(error);
    }
  };

  // ---------- Expense ----------

  const addExpense = async (expense: any): Promise<void> => {
    try {
      const response = await axios.post(
        `${API_URL}/expense`,
        expense,
        { headers: { Authorization: token } }
      );

      setExpenses((prev) => [response.data.expense, ...prev]);
      setTotalExpenses((prev) => prev + response.data.expense.amount);

    } catch (error) {
      console.error(error);
    }
  };

  const getExpenses = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get(
        `${API_URL}/expense`,
        { headers: { Authorization: token } }
      );

      setExpenses(response.data);

      const total = response.data.reduce(
        (acc: number, expense: Expense) => acc + expense.amount,
        0
      );

      setTotalExpenses(total);

    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const deleteExpense = async (id: string, amount: number): Promise<void> => {
    try {
      await axios.delete(
        `${API_URL}/expense/${id}`,
        { headers: { Authorization: token } }
      );

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
      setTotalExpenses((prev) => prev - amount);

    } catch (error) {
      console.error(error);
    }
  };

  // ---------- Helpers ----------

  const totalBalance = (): number => totalIncome - totalExpenses;

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];

    history.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        expenses,
        totalIncome,
        totalExpenses,
        error,
        loggedUser,
        leaderboard,
        isPremium,
        addIncome,
        getIncomes,
        deleteIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalBalance,
        transactionHistory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used inside GlobalContextProvider");
  }

  return context;
};