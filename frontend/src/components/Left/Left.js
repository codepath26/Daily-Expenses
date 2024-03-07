import { useGlobalContext } from "../../Context/globalContext";
import { signout } from "../../utils/icons";
import PaymentGate from "../PremiumUser/PaymentGate";
import { NavLink } from "react-router-dom";

function Left() {
  const { loggedUser, isPremium } = useGlobalContext();
  console.log(loggedUser, "this is the logged user");
  return (
    <div className=" md:w-[20%] w-full md:h-[100vh] relative  border-[3px]  border-white bg-gray-200   rounded-[20px]">
      <div className="flex  md:justify-normal justify-center md:flex-row flex-col items-center gap-[1rem] md:ps-2">
        <div className="w-20 h-20  rounded-full border bg-pink-100  shadow-md">
          <img
            className="object-cover h-full w-full"
            src={loggedUser?.pic}
            alt="avtar"
          />
        </div>
        <div className=" w-[50%] text-center">
          <h2>
            {loggedUser?.name[0].toUpperCase() + loggedUser.name.slice(1)}
          </h2>
        </div>
      </div>
      <p className="tex-thin italic text-sm p-1">Email: {loggedUser?.email}</p>
      <div className="m-1  p-1 ">{!isPremium && <PaymentGate />}</div>
      <ul className="flex md:flex-col  flex-col sm:flex-row flex-wrap ps-2 md:mt-4 my-4  ">
        <NavLink
          className={({ isActive }) =>
            `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
              isActive
                ? "relative  text-blue-900 before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                : ""
            }`
          }
          to="/deshboard"
        >
          {" "}
          Dasboard{" "}
        </NavLink>
        {isPremium && (
          <NavLink
            className={({ isActive }) =>
              `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
                isActive
                  ? "relative text-blue-900  before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                  : ""
              }`
            }
            to="/transaction"
          >
            {" "}
            Transaction{" "}
          </NavLink>
        )}
        <NavLink
          className={({ isActive }) =>
            `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
              isActive
                ? "relative  text-blue-900 before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                : ""
            }`
          }
          to="/income"
        >
          {" "}
          Income{" "}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
              isActive
                ? "relative  text-blue-900 before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                : ""
            }`
          }
          to="/expenses"
        >
          {" "}
          Expenses{" "}
        </NavLink>
        {isPremium && (
          <NavLink
            className={({ isActive }) =>
              `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
                isActive
                  ? "relative  text-blue-900 before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                  : ""
              }`
            }
            to="/leaderboard"
          >
            {" "}
            Leaderboard{" "}
          </NavLink>
        )}

        {isPremium && (
          <NavLink
            className={({ isActive }) =>
              `px-2 my-2   text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer  ${
                isActive
                  ? "relative text-blue-900  before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
                  : ""
              }`
            }
            to="/download"
          >
            {" "}
            Download Expenses{" "}
          </NavLink>
        )}
      </ul>

      <div className="md:m-0   text-center my-4  absolute   w-full bottom-5 ">
        <li className="md:m-0 ">{signout} Sign Out</li>
      </div>
    </div>
  );
}

export default Left;

// md:w-[20%] w-[90%]  relative  border-[3px] border-white bg-gray-100 bg-opacity-80  md:m-4 rounded-[20px]

//  {
//    navItems.map((item) => {
//      const classNames = `${
//        active === item.id
//          ? " relative  before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
//          : ""
//      }  px-2 my-2  text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer `;
//      console.log(active, item.id);
//      return (
//        <li
//          className={classNames}
//          key={item.id}
//          onClick={() => {
//            activeHandler(item.id);
//          }}
//        >
//          {item.icon}
//          <span className="ms-1">{item.title}</span>
//        </li>
//      );
//    });
//  }
