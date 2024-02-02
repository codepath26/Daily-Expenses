import React from "react";
import { dateFormat } from "../../utils/dateFormat";
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from "../../utils/icons";


function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "Salary":
        return money;
      case "Freelancing":
        return freelance;
      case "Investments":
        return stocks;
      case "Stocks":
        return users;
      case "Bitcoin":
        return bitcoin;
      case "Bank":
        return card;
      case "Youtube":
        return yt;
      case "Other":
        return piggy;
      default:
        return "";
    }
  };

  const expenseCatIcon = () => {
    console.log("this expenseeIcomcart is called" , category)
    switch (category) {
      case "Education":
        return book;
      case "Groceries":
        return food;
      case "Health":
        return medical;
      case "Subscriptions":
        return tv;
      case "Takeaways":
        return takeaway;
      case "Clothing":
        return clothing;
      case "Travelling":
        return freelance;
      case "Other":
        return circle;
      default:
        return "";
    }
  };
  return (
    <>
      <li
        key={id}
        className="flex border-2 border-white justify-between rounded-[10px] mb-3 p-2 "
      >
        <div className="border-2 border-white rounded-[10px] my-auto me-2 bg-gray-300 flex justify-center items-center w-[5%] h-[80%]">
          <span className="md:text-[1.5rem]  text-gray-700 hover:text-purple-700 mx-2">
            {type === "expense" ? expenseCatIcon() : categoryIcon()}
          </span>
        </div>
        <div className="flex flex-col  px-3 w-[85%]">
          <div className="font-[500] flex items-center text-xlg">
            <p className="flex mb-1 items-center">
              <i className="me-4  fa-solid fa-circle text-[10px] text-green-500"></i>
             <span className="opacity-80">{category}</span> 
            </p>
          </div>
          <div className="flex gap-5  items-center text-[.9rem] opacity-80">
            <p className="w-[20%] ">
              <span className="me-1 text-gray-900 text-[1rem]">{dollar}</span>
              {amount}
            </p>
            <p className="w-[30%]">
              <span className="me-1 text-gray-900 text-[1rem]">{calender}</span>
              {dateFormat(date)}
            </p>
            <p className="w-[50%] ">
              <span className="me-1 text-gray-900 text-[1rem]">{comment}</span>
              {description}
            </p>
          </div>
        </div>
        <div className="flex border-2 border-white rounded-full bg-gray-900   justify-center items-center w-[5%] py-1 my-auto  ">
          <span
            className=" hover:text-red-500  text-white   transition-all duration-100 "
            onClick={() => deleteItem(id, amount)}
          >
            {" "}
            {trash}
          </span>
        </div>
      </li>
    </>
  );
}

export default IncomeItem;
