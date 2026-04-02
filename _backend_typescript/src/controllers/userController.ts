import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import jwt  from "jsonwebtoken";

interface SingupBody {
  name : string
  email : string
  password : string
  pic : string
}
interface LoginBody {
  email : string
  password : string
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


const generateToken = (id : string , email : string): string => {
  const SECRET_KEY  = process.env.SECRET_KEY as string;
  if(!SECRET_KEY) throw new Error("Secret key is missing in environment variables")
  const token = jwt.sign({id,email}, SECRET_KEY , {expiresIn : "30d"})
  return token;
}

export const loginHanlder = async (req :Request<{},{},LoginBody> , res : Response):Promise<void> =>{

  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
      res.status(404).json({message : "user not found"})
    }else{
      const isRightPass = await bcrypt.compare(password , user.password);
      if(isRightPass){

        const token = await generateToken(user._id.toString() , user.email);
        if(token){
          res.status(200).json({user,token});
        }else{
          res.status(500).json({message : "something went wrong"})
        }

      }else{
        res.status(400).json({message : "You entered wrong password"});
      }
    }

  }catch (err: unknown) {
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
  }
  res.status(500).json({ message: "Unknown error occurred" });
}

}
