import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context/globalContext.js";
import axios from "axios";
function Leaderboard() {
  const [showLeader, setShowLeader] = useState(false);
  const { loggedUser, leaderboard, leaderboardHandler } = useGlobalContext();
  const token = loggedUser.token;
  const showLeaderboard = async () => {
    setShowLeader(true);
  };
  const hideLeaderboard = () => {
    setShowLeader(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/leaderboard`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      leaderboardHandler(response.data);
    };
    fetchData();
  }, [token, leaderboardHandler]);
  return (
    <div className="flex relative   flex-col h-screen">
      {!showLeader ? (
        <div className="flex w-full h-full justify-center items-center">
          <button
            className="bg-gray-300 cursor-pointer  rounded px-2 py-1 hover:bg-gray-700 hover:text-white"
            onClick={showLeaderboard}
          >
            ShowLeaderBoard
          </button>
        </div>
      ) : (
        <div className="flex flex-col  mt-5 items-center">
          <h1>we are working on user specific items.</h1>
          <ul className=" w-full flex flex-col items-center mt-5">
            {leaderboard?.map((item) => {
              return (
                <li
                  key={item._id}
                  className="border hover:shadow-md w-[90%] p-2 border-gray-300 rounded-md"
                >
                  <span>
                    Name :{" "}
                    <span className="text-purple-700">
                      {" "}
                      {item.name[0].toUpperCase() + item.name.slice(1)}{" "}
                    </span>
                  </span>
                  <span>
                    {" "}
                    Total Expenses :
                    <span className="text-purple-700">
                      {" "}
                      {item.totalExpenses}
                    </span>
                  </span>
                  <span>
                    {" "}
                    Total Incomes :
                    <span className="text-purple-700">
                      {" "}
                      {item.totalIncomes}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>

          <butto
            className="bg-gray-300 cursor-pointer absolute top-3 right-3  rounded px-2 py-1 hover:bg-gray-700 hover:text-white"
            n
            onClick={hideLeaderboard}
          >
            HideLeaderBoard
          </butto>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
