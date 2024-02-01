import ExpenseModel from "../models/ExpenseModel.js";

export const addExpense = async (req, res) => {
  try {
    const { title, amount, description, category, date } = req.body;
    const expense = ExpenseModel({
      title,
      amount,
      description,
      category,
      date,
    });

    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went Wrong" });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const fullExpenses = await ExpenseModel.find().sort({ createdAt: -1 });
    res.status(200).json(fullExpenses);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const expense = await ExpenseModel.findByIdAndDelete(id);
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
    res.status(500).json({message : "Internal Server Error"});
  }
};
