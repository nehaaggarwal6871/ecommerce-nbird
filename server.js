// const express = require('express')
// const colors = require('colors')
import express from "express";
// import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";

// configure env (.env in root file)
dotenv.config();

// esmodule fixed
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// database config
connectDB();

//  rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use(express.static(path.join(__dirname, "./client/build")));

// rest api

app.use("*", function (req, res) {
  res.sendFile(path.__dirname, "./client/build/index.html");
});

// PORT
const PORT = process.env.PORT || 8080;

// run app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgCyan.white);
});
