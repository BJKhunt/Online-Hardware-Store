import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import companyRouter from "./routes/company.js";
import contactRouter from './routes/contact.js';
import inquiryRouter from './routes/inquiry.js';
import orderRouter from './routes/order.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/company", companyRouter);
app.use("/contact", contactRouter);
app.use("/inquiry", inquiryRouter);
app.use("/order", orderRouter);


const CONNECTION_URL = 'mongodb://localhost:27017/oosedb';
//const CONNECTION_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);