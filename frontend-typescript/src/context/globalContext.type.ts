import type React from "react";

export type UserState = {
  _id: string;
  name: string;
  email: string;
  password: string;
  pic: File | null;
  isPremiumUser: boolean;
  totalExpenses: number;
  totalIncomes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
};

export type IncomeTypes = {
  _id: string;
  title: string;
  amount: number;
  description: string;
  category: string;
  date: string; // use string because MongoDB sends ISO date strings
  type: "income" | "expense"; // union type for clarity
  userId: string; // should be string, not number
  createdAt: string; // ISO timestamp from Mongo
  updatedAt: string;
  __v: number;
};
export type LoggedUser = {
  email: string;
  password: string;
};

export type GlobalContextProviderProps = {
  children: React.ReactNode;
};
export type GlobalContextProps = {
  loggedUser: UserState | null;
  loginHandler: (user: UserState) => void;
  logoutHandler: () => void;
  loading: boolean;
  addIncome: (income: string) => void;
  getIncomes: () => void;
  deleteIncome: (id: string, amount: number) => void;
  incomes: IncomeTypes[];
  totalIncome: number;
};
