import React, { useEffect } from "react";
import Leftside from "../Dashboard/Leftside";
import Rightside from "../Dashboard/Rightside";
import { useGlobalContext } from "../../Context/globalContext";

function Dashboard() {
  const { loggedUser, getIncomes, getExpenses } = useGlobalContext();
  console.log("thisis the logged user daata", loggedUser);

  useEffect(() => {
    const getdata = async () => {
      getIncomes();
      // getExpenses();
    };

    getdata();
  }, [getIncomes, getExpenses]);
  return (
    <>
      <h1 className="m-2 text-[2vw] font-[600] text-purple-800 md:text-start text-center">
        Dashboard
      </h1>
      <div className="flex flex-wrap flex-col md:items-start items-center w-[100%] border md:flex-row">
        <Leftside />
        <Rightside />
      </div>
    </>
  );
}

export default Dashboard;
