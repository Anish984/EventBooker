import express,{Application,Request,Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRouter from './routes/eventRouter';
import connectDB from './utils/connectDB';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter'
const app : Application = express();


app.use(
  cors({
    origin: (origin, callback) => {
      // If there's no origin (like Postman), allow it
      if (!origin) return callback(null, true);

      // Allow any domain starting with "https://event-booker"
      if (origin.startsWith("https://event-booker") || origin === "http://localhost:5174") {
          return callback(null, true);
      }
      // Otherwise, block it
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);



// ✅ Handle preflight requests (OPTIONS)
app.options(/.*/, cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 3000;

app.get('/home',(req:Request,res:Response)=>{
    res.send("home page");
});
app.use("/api",userRouter);
app.use("/api/auth/",authRouter);
app.use("/api",eventRouter);

app.listen(PORT,async():Promise<void>=>{
    try{
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    }catch(err){
        console.error("Failed to connect to the database",err);
    }
})