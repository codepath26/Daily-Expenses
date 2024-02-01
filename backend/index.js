import dotenv from 'dotenv';
import  express  from 'express';
import db from './db/database.js';
import IncomeRoutes from './routes/Income.js'
import ExpenseRoutes from './routes/Expense.js'
import cors from 'cors'
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended : false}));

app.use(IncomeRoutes);
app.use(ExpenseRoutes);



const server = ()=>{
   db();
  app.listen(process.env.PORT , ()=>{
    console.log(`server is running on port ${process.env.PORT}`);
  })
}
server();
