import express , {Express , Request,Response}  from "express";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import UserRoutes from "./routes/userRoutes.js"
import DBConnection from "./database/database.js";

dotenv.config();
const app : Express = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(UserRoutes)


const server = async () => {
    await DBConnection();
    app.listen(PORT , () => {
    console.log(`server is runing on Port: ${PORT} `)
})  
}

server();



