import React from 'react'
import { useGlobalContext } from '../../Context/globalContext'
import LineChart from '../Chart/Chart';
import { dollar } from "../../utils/icons";



function Leftside() {
  const {totalExpenses , totalIncome ,totalBalance } = useGlobalContext();
  return (
    
    <>
         
      <div className="flex  md:w-[60%] w-full">
        <div className="flex flex-col  w-full  p-2">
          <LineChart/>
          <div className="flex md:justify-between flex-row  border my-8 w-full">
            <div  className="flex justify-center flex-col items-center border-2 border-white rounded-[10px] bg-red-100 bg-opacity-[50%] p-1 w-[45%]">

              <h3 className="font-[600]">Total Income</h3>
              <div className="opacity-[60%] m-2 text-3xl"><span className="me-1">{dollar}</span>{totalIncome}</div>
            </div>
            <div  className="flex justify-center flex-col items-center border-2 border-white rounded-[10px] bg-red-100 bg-opacity-[50%] p-1 w-[45%]">
              <h3 className="font-[600]">Total Expenses</h3>
              <div className="opacity-[60%] m-2 text-3xl"><span className="me-1">{dollar}</span>{totalExpenses}</div>
            </div>
          </div>
         
          <div className=" flex justify-center">
          <div  className="flex flex-col items-center border-2 border-white rounded-[10px] bg-red-100 bg-opacity-[50%] p-1 w-[45%]">
              <h3 className="font-[600]">Current Balance</h3>
              <div className=" m-2 text-3xl text-green-500"><span className="me-1">{dollar}</span>{totalBalance()}</div>
            </div>
        
          </div>
        </div>
      </div>
    </>
  )
}

export default Leftside