import express from 'express';
import "dotenv/config";
import { db } from "./config/db.js";
import userRouter from './routes/user.route.js'; 
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
const PORT = process.env.PORT || 8000;  

app.use(
    cors({
        
       origin:process.env.CLIENT_URL,
       credentials:true,
    })
)
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authRouter);



app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});


app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello world"
    });
});


app.use('/api/v1/users', (req, res, next) => {
    console.log('[DEBUG] Request masuk ke /api/v1/users');
    next();
}, userRouter);


app.use("*", (req, res) => {
    res.status(404).json({
        message: "not found"
    });
});


app.listen(PORT, () => {
    console.log(`Server started, listening on port ${PORT}`);
});