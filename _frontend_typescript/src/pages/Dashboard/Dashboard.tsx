import React, { useEffect } from "react";
import LineChart from "../../components/common/LineChart";
import { useGlobalContext } from "../../context/ExpenseContext";

// import { dollar } from "../../utils/icons";
const dollar = "";
function Dashboard() {
  const {
    loggedUser,
    incomes,
    expenses,
    getIncomes,
    getExpenses,
    totalIncome,
    totalExpenses,
    totalBalance,
    transactionHistory,
  } = useGlobalContext();

  useEffect(() => {
    const loadData = async () => {
      await getIncomes();
      await getExpenses();
    };

    loadData();
  }, []);

  const history = transactionHistory();

  const minIncome = incomes.length
    ? Math.min(...incomes.map((i) => i.amount))
    : 0;

  const maxIncome = incomes.length
    ? Math.max(...incomes.map((i) => i.amount))
    : 0;

  const minExpense = expenses.length
    ? Math.min(...expenses.map((i) => i.amount))
    : 0;

  const maxExpense = expenses.length
    ? Math.max(...expenses.map((i) => i.amount))
    : 0;

  return (
    <div className="w-full p-6">

      {/* Header */}
      <h1 className="text-3xl font-semibold text-purple-700 mb-6">
        Dashboard
      </h1>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">

          {/* CHART */}
          <div className="bg-white rounded-xl shadow p-4">
            <LineChart />
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-green-50 p-4 rounded-xl shadow text-center">
              <h3 className="font-semibold text-gray-600">Total Income</h3>
              <p className="text-2xl text-green-600 font-bold mt-2">
                {dollar}{totalIncome}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl shadow text-center">
              <h3 className="font-semibold text-gray-600">Total Expenses</h3>
              <p className="text-2xl text-red-600 font-bold mt-2">
                {dollar}{totalExpenses}
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl shadow text-center">
              <h3 className="font-semibold text-gray-600">Current Balance</h3>
              <p className="text-2xl text-blue-600 font-bold mt-2">
                {dollar}{totalBalance()}
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-xl shadow p-4">

          {/* Recent Transactions */}
          <h2 className="font-semibold text-purple-800 mb-4">
            Recent Transactions
          </h2>

          <div className="space-y-2 mb-6">
            {history.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between border-b py-2 text-sm"
              >
                <span>{item.title}</span>
                <span
                  className={
                    item.type === "expense"
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {dollar}{item.amount}
                </span>
              </div>
            ))}
          </div>

          {/* Min Max Section */}
          <div className="space-y-3 text-sm">

            <h3 className="font-semibold text-gray-600">Income Range</h3>
            <div className="flex justify-between">
              <span>Min</span>
              <span className="text-red-500">{dollar}{minIncome}</span>
            </div>
            <div className="flex justify-between">
              <span>Max</span>
              <span className="text-green-500">{dollar}{maxIncome}</span>
            </div>

            <h3 className="font-semibold text-gray-600 mt-4">
              Expense Range
            </h3>

            <div className="flex justify-between">
              <span>Min</span>
              <span className="text-green-500">{dollar}{minExpense}</span>
            </div>

            <div className="flex justify-between">
              <span>Max</span>
              <span className="text-red-500">{dollar}{maxExpense}</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;