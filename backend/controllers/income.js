import incomeModel from "../models/incomeModel.js";

export const addIncome = async (req, res) => {
  try {
    const { title, amount, description, category, date } = req.body;
    const income = incomeModel({
      title,
      amount,
      description,
      category,
      date,
    });

   const newincome =  await income.save();
   console.log(newincome)
    res.status(200).json({income : newincome});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went Wrong" });
  }
};

export const getIncomes = async (req, res) => {
  try {
    const fullIncomes = await incomeModel.find().sort({ createdAt: -1 });
    res.status(200).json(fullIncomes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const id = req.params.id;
    const income = await incomeModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Income Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateIncome = async (req, res) => {
  const id = req.params.id;
  const updatedImcome = req.body;
  const existingItem =await incomeModel.findById(id);

  if(!existingItem){
    res.status(404).json({message : "Income Not Found"});
  }else{
    const newIncome = await incomeModel.findByIdAndUpdate(id,updatedImcome,{new : true});
    res.status(200).json(newIncome);
  }
};
