import mongoose from "mongoose";

const DBConnection = async (): Promise<void> => {
  try {
    const dbURL = process.env.DB_URL as string;
    console.log(dbURL, "getting DBURL");
    if (!dbURL) {
      throw new Error("DB_URL is not defined in environment variables");
    }
    await mongoose.connect(dbURL);
    console.log("mongoDB connected successfully");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log("MongoDB connection Error", err.message);
    } else {
      console.error("Unknown error while connecting to MongoDB");
    }
    process.exit(1);
  }
};

export default DBConnection;
