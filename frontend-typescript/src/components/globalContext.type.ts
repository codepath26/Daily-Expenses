import type React from "react";

export type UserState = {
  name: string;
  email: string;
  password: string;
  pic: File | null;
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
};
