import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import customerRouter from './routes/customerRouter.js';
import itemRouter from './routes/itemRouter.js';
import orderRouter from './routes/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() =>
     console.log('MongoDB connected')
    ).catch(
        err => console.log(err)
    );


app.use('/api/auth', authRouter);
app.use('/api/customers', customerRouter);
app.use('/api/items', itemRouter);
app.use('/api/orders', orderRouter);

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, () => 
        console.log(`Server running on port ${PORT}`)
);














//mongodb+srv://kalpanikapuge1020:kdkapuge28870@cluster0.onyvhyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
//mongodb+srv://admin:admin2025@cluster0.onyvhyn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0