import express,{Application,Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRouter from './routes/eventRouter';
import connectDB from './utils/connectDB';

const app : Application = express();
app.use(express.json());
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/',(req:Request,res:Response)=>{
    res.send("home page");
});

app.use("/api/events",eventRouter);

app.listen(PORT,async():Promise<void>=>{
    try{
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    }catch(err){
        console.error("Failed to connect to the database",err);
    }
})