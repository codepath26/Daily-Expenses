import mongoose from "mongoose";

const db = async () => {
  try {

    await mongoose.connect(process.env.DB_URL);
    console.log("db connected successfully");

  } catch (error) {
    
    console.log("DB Connection Error");

  }
};

export default db;
