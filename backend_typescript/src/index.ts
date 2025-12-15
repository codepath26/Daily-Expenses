import dotenv from "dotenv";
import cors from "cors";
import express, { type Application } from "express";
import helmet from "helmet";
import DBConnection from "./database/database.js";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

app.use("/", (req, res) => {
  console.log(req.method, "getting the methos");
  res.json({ name: "parth thakor" });
});

const server = async (): Promise<void> => {
  try {
    await DBConnection();
    app.listen(PORT, (): void => {
      console.log("server is running on port", PORT);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getting the error while connection", error.message);
    } else {
      console.error("getting the unknown error!");
    }
  }
};

server();
