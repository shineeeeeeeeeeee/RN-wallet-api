//const express = require("express")
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import ratelimiter from "./middleware/rate-limiter.js";

import transactionsRoute from "./routes/transactionsRoute.js";

import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production") job.start()

// middleware : function running between request and response
app.use(ratelimiter);
app.use(express.json())

// custom simple middleware
// app.use((req, res, next) => {
//     console.log("Hey we hit a request!, the method is: ",req.method);
//     next();
// })

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({start: "ok"})
});

//connectDB(process.env.DATABASE_URL)

// app.get("/health" , (req, res) => {
//     res.send("Its's working");
// });

app.use("/api/transactions", transactionsRoute);

//console.log("My port: ",process.env.PORT);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT: ",PORT);
    });
});