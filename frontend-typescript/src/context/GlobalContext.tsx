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
  UserState,
} from "./globalContext.type";

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [loggedUser, setLoggeduser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setLoggeduser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const loginHandler = useCallback((user: UserState) => {
    setLoggeduser(user);
  }, []);
  const logoutHandler = useCallback(() => {
    setLoggeduser(null);
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        loggedUser,
        loginHandler,
        logoutHandler,
        loading,
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
