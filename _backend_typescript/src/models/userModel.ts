import { Schema, model , Document } from "mongoose";



export interface IUser extends Document {
    name : string
    email: string
    password:string
    pic:string
     isPremiumUser: boolean
    totalExpenses: number
    totalIncomes: number
    createdAt : Date
    updatedAt :  Date
}

const userSchema = new Schema(
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

const User = model<IUser>("User", userSchema);

export default User;
