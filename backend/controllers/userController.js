import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create The Json Token

const generateToken = (id, email) => {
  try {
    const token = jwt.sign({ id, email }, process.env.SECERET_KEY, {
      expiresIn: "30d",
    });

    return token;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signupHandler = async (req, res) => {
  const { name, email, password, pic } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    // console.log(`this is the user ===> ${existingUser}`);
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const IncreptedPass = await bcrypt.hash(password, 10);
      // console.log(`increpted password is ==> ${IncreptedPass}`);
      const user = await User.create({
        name,
        email,
        password: IncreptedPass,
        pic,
      });
      if (user) {
        res.status(200).json({
          user,
        });
      } else {
        res.status(500).json({ message: "some thing went wrong" });
      }
    }
  } catch (error) {
    console.log("this", error);
    res.status(500).json({ message: "some thing went wrong" });
  }
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // console.log("login==>", user);
    if (user) {
      const metchPass = await bcrypt.compare(password, user.password);
      // console.log("password is metched", metchPass);
      if (metchPass) {
        const token = await generateToken(user._id, user.email);
        // console.log(token);
        if (token) {
          res.status(200).json({ user, token });
        } else {
          res.status(500).json({ message: "something went wrong" });
        }
      } else {
        res.status(400).json({ message: "You entered Wrong Password" });
      }
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  try {
    // console.log(keyword , "this is the keyword")
    const users = await User.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    // console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};
