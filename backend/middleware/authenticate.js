import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    // console.log("startted");
    // console.log(req.headers);
    const token = req.headers["authorization"];
    const secretkey = process.env.SECERET_KEY;
    // console.log(token);

    const data = jwt.verify(token, secretkey);
    // console.log(data);
    const user = await User.findById(data.id);
    // console.log(user);
    if (user) {
      req.user = user;
      next();
    } else {
      // console.log("user not found");
      return res.status(404).json({ message: "user is not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(403).json({ success: false });
  }
};
export default authenticateUser;
