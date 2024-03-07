import IncomeModel from "../models/IncomeModel.js";
import User from "../models/userModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, description, category, date } = req.body;
    // console.log(req.user._id);
    const income = IncomeModel({
      title,
      amount,
      description,
      category,
      date,
      userId: req.user._id,
    });
    req.user.totalIncomes = req.user.totalIncomes + parseInt(amount);
    req.user.save();

    const newincome = await income.save();
    console.log(newincome);
    // res.status(200).json({ income: null });
    res.status(200).json({ income: newincome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went Wrong" });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const fullIncomes = await IncomeModel.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    console.log(fullIncomes);
    res.status(200).json(fullIncomes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const income = await IncomeModel.findByIdAndDelete(id);
    const userId = income.userId;
    const user = await User.findById(userId);
    user.totalIncomes = user.totalIncomes - parseInt(income.amount);
    user.save();
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateIncome = async (req, res) => {
  const id = req.params.id;
  const updatedImcome = req.body;
  const existingItem = await IncomeModel.findById(id);

  if (!existingItem) {
    res.status(404).json({ message: "Income Not Found" });
  } else {
    const newIncome = await IncomeModel.findByIdAndUpdate(id, updatedImcome, {
      new: true,
    });
    res.status(200).json(newIncome);
  }
};
