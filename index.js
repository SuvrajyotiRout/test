import express from 'express'
const app = express();
import mongoose from 'mongoose';
import 'dotenv/config';
import AuthRouter from "./router/authrouter.js"
import UserRouter from "./router/userrouter.js"
mongoose.connect(process.env.MONGODB);

app.use(express.json());
app.get('/', (req, res) => {
    res.json({
        message: "Api is running"
    })
});
app.use('/auth', AuthRouter);
app.use('/user', UserRouter)



app.listen(4000)