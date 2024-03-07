import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    isPremiumUser: {
      type: Boolean,
      default: false,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
    totalIncomes: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);
export default User;
