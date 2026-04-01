import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import { Jwt } from "jsonwebtoken";

interface SingupBody {
  name : string
  email : string
  password : string
  pic : string
}

export const singupHandler = async (req : Request<{},{},SingupBody>, res : Response) : Promise<void> => {

  const {name ,email, password , pic} = req.body;
  try{

    const existingUser = await User.findOne({email});
    if(existingUser){
      res.status(400).json({message : "User already exist."})
    }else{
      const IncryptPass = await bcrypt.hash(password , 10);
      const user = await User.create({name,email,password : IncryptPass , pic,totalExpenses: 0 , totalIncomes : 0});
      
      if(user){
        res.status(201).json({
          message : "User created Successfully",
          user});
      }else{
        res.status(500).json({message : "something went wrong."});
      }
    }
  }catch (err: unknown) {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  }
  res.status(500).json({ message: "Unknown error occurred" });
}
}

