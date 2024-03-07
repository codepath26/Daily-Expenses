import ExpenseModel from "../models/ExpenseModel.js";
import User from "../models/userModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, description, category, date } = req.body;
    const expense = ExpenseModel({
      title,
      amount,
      description,
      category,
      date,
      userId: req.user._id,
    });
    req.user.totalExpenses = req.user.totalExpenses + parseInt(amount);
    req.user.save();
    const newExpense = await expense.save();
    res.status(200).json({ expense: newExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went Wrong" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const id = req.user._id;

    const fullExpenses = await ExpenseModel.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.status(200).json(fullExpenses);
    // res.status(200).json("completed");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await ExpenseModel.findByIdAndDelete(id);
    const userId = expense.userId;
    const user = await User.findById(userId);
    user.totalExpenses = user.totalExpenses - parseInt(expense.amount);
    user.save();
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = req.body;
    const existingExpense = await ExpenseModel.findById(id);
    if (!existingExpense) {
      res.status(404).json({ message: "Expense notFound" });
    } else {
      const newExpense = await ExpenseModel.findByIdAndUpdate(
        id,
        updatedExpense,
        { new: true }
      );
      res.status(200).json(newExpense);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const leaderboardHandler = async (req, res) => {
  try {
    const leaderBoard = await User.aggregate([
      {
        $lookup: {
          from: "expenses", // Assuming your Expenses collection is named 'expenses'
          localField: "_id",
          foreignField: "userId", // Assuming there's a 'userId' field in Expenses referencing User
          as: "expenses",
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          totalExpenses: { $sum: "$totalExpenses" }, // Adjust this field according to your Expenses schema
          totalIncomes: { $sum: "$totalIncomes" }, // Adjust this field according to your Expenses schema
        },
      },
      {
        $sort: { totalExpenses: -1 },
      },
    ]);
    console.log("this is the leader board");
    console.log(leaderBoard);

    res.status(200).json(leaderBoard);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};
