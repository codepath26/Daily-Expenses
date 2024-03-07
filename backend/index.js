import dotenv from "dotenv";
import express from "express";
import db from "./db/database.js";

import IncomeRoutes from "./routes/Income.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import ExpenseRoutes from "./routes/Expense.js";
import userRoutes from './routes/user.js'

import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(userRoutes);
app.use("/api", PaymentRoutes);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID })
);
app.use(IncomeRoutes);
app.use(ExpenseRoutes);

const server = async () => {
  await db();

  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
};
server();
