import { useEffect , useRef } from "react";
import Chart from 'chart.js/auto';
import { useGlobalContext } from "../../Context/globalContext";
import { dateFormat } from "../../utils/dateFormat";


function LineChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const {incomes , expenses} =useGlobalContext();
  console.log(incomes ,expenses)

  useEffect(()=>{
    if(chartInstance.current){
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(myChartRef,{
      type : "line",
      data : {
        labels :[...incomes.map(income =>{
          const {date} = income;
          return dateFormat(date);
        })],
        datasets : [
          {
            label : "Income",
            data: [...incomes.map(income => {
              const {amount}  = income;
              return amount;
            })],

            borderColor: 'green',
            tension: .2,
          },
          {
            label : "Expenses",
            data: expenses.map(expense => {
              const {amount}  = expense;
              return amount;
            }),
            borderColor: 'red',
            tension: .2,
          },
      
        ]
      }

    })
    return ()=>{
      if(chartInstance.current){
        chartInstance.current.destroy();
      }
    }
  },[expenses ,incomes]);
  return (
    <div className="bg-[#FCF6F9] border border-[#FFFFFF] shadow-lg p-[1rem] rounded-[20px] h-full w-full">
      <canvas ref={chartRef}  />
    </div>
  );
}

export default LineChart;
