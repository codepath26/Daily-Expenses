import { navItems } from "../../utils/navItems";
import { signout } from "../../utils/icons";
import { useState } from "react";
import PaymentGate from "../PremiumUser/PaymentGate";

function Left({ active, activeHandler, changeLayout }) {
  const [isPremium, setIsPremium] = useState(false);
  // const [error, setError] = useState(false);

  // const onSuccess = () => {
  //   localStorage.setItem("ispremium", true);
  //   setIsPremium(true);
  // };
  // const onError = () => {
  //   setError(true);
  //   alert("something went wrong");
  // };

  return (
    <div className=" md:w-[20%] w-full md:h-[100vh] relative  border-[3px]  border-white bg-gray-200   rounded-[20px]">
      <div className="flex  md:justify-normal justify-center md:flex-row flex-col items-center gap-[1rem] md:ps-2">
        <div className="w-[80px] h-[80px]  rounded-full border bg-pink-100  shadow-md">
          <img
            className="object-cover h-full w-full"
            src={process.env.PUBLIC_URL + "/Images/man.png"}
            alt="avtar"
          />
        </div>
        <div className="">
          <h2>Parth Thakor</h2>
          <p className="font-thin">Your Money</p>
        </div>
      </div>
      <ul className="flex md:flex-col  flex-col sm:flex-row flex-wrap ps-2 md:mt-4 my-4  ">
        {navItems.map((item) => {
          const classNames = `${
            active === item.id
              ? " relative  before:bg-blue-900 before:w-[5px] before:h-full before:border-r before:rounded-r-full before:absolute before:left-0 before:top-0"
              : ""
          }  px-2 my-2  text-gray-600 text-xl hover:font-bold transition-all duration-400 ease-in-out cursor-pointer `;
          console.log(active, item.id);
          return (
            <li
              className={classNames}
              key={item.id}
              onClick={() => {
                activeHandler(item.id);
              }}
            >
              {item.icon}
              <span className="ms-1">{item.title}</span>
            </li>
          );
        })}
      </ul>
      {!isPremium && <PaymentGate />}
      <div className="md:m-0  md:text-start text-center my-4   w-full bottom-5 ps-2">
        <li className="md:m-0 mx-auto">{signout} Sign Out</li>
      </div>
    </div>
  );
}

export default Left;

// md:w-[20%] w-[90%]  relative  border-[3px] border-white bg-gray-100 bg-opacity-80  md:m-4 rounded-[20px]
