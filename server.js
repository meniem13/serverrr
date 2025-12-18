import express from "express";
import cors from "cors";
import {
  createBookController,
  createBookDetailsController,
  deleteBookController,
} from "./controllers/bookController.js";
import { createUserController } from "./controllers/userController.js";
import { connection } from "./db.js";
import cookieParser from "cookie-parser";
import { getUserController } from "./controllers/getUser.js";
import { addNameController } from "./controllers/nameController.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Configure CORS to allow credentials and specify frontend origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
    maxAge: 600, // Cache preflight requests for 10 minutes
  })
);

// Improved IP address detection middleware
app.use((req, res, next) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.headers["x-real-ip"] ||
    req.socket.remoteAddress ||
    req.ip;

  req.clientIp = ip;
  console.log("Client IP:", ip);
  next();
});

app.get("/", (req, res) => {
  // Send the client's IP address in the response
  res.json({ ip: req.clientIp });
});
app.post("/p", (req, res) => {
  // Send the client's IP address in the response
  res.json("fuckyou ");
});

// Routes
app.get("/api", (req, res) => {
  res.cookie("test_cookie", "value"); // Example cookie for testing
  res.send("Cookie has been set!");
});

app.get("/api/create_book", createBookController);
app.get("/api/add_name", addNameController);
app.get("/api/create_book_details", createBookDetailsController);
app.post("/api/create_user", createUserController);
app.post("/api/get_user", getUserController);
app.delete("/api/delete_book/:book_id", deleteBookController);

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// const express = require("express");
// const app = express();

// // Serve static files from the "public" folder
// app.use(express.static("public"));
// app.get("/meniem", () => {});
// app.listen(3004, () => {
//   console.log("Server running on http://localhost:3004");
// });
