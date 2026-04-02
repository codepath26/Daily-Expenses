import { useEffect, useRef, type JSX } from "react";
import Chart from "chart.js/auto";
import { useGlobalContext } from "../../context/ExpenseContext";
import dayjs from "dayjs";

interface Transaction {
  amount: number;
  createdAt: string;
}

export const dateFormat = (date: string | Date): string =>
  dayjs(date).format("DD/MM/YYYY");

const  LineChart = (): JSX.Element =>  {

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  const { incomes, expenses }: {
    incomes: Transaction[];
    expenses: Transaction[];
  } = useGlobalContext();

  useEffect(() => {

    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: incomes.map((income) => dateFormat(income.createdAt)),

        datasets: [
          {
            label: "Income",
            data: incomes.map((income) => income.amount),
            borderColor: "green",
            tension: 0.2,
          },
          {
            label: "Expenses",
            data: expenses.map((expense) => expense.amount),
            borderColor: "red",
            tension: 0.2,
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };

  }, [expenses, incomes]);

  return (
    <div className="bg-[#FCF6F9] border border-[#FFFFFF] shadow-lg p-[1rem] rounded-[20px] h-full w-full">
      <canvas ref={chartRef} />
    </div>
  );
}

export default LineChart;