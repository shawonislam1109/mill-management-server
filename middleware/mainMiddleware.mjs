import express from "express";
import morgan from "morgan";
import cors from "cors";

// Allowed origins array
const allowedOrigins = ["http://localhost:5173/"];

// CORS configuration with dynamic origin handling
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log(origin);
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//   credentials: true, // Allow credentials (e.g., cookies)
// };

// Middleware setup function
export const setupMiddleware = (app) => {
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors()); // Pass corsOptions here
};
