import express from "express";
import morgan from "morgan";
import cors from "cors";

// Allowed origins array
const allowedOrigins = [
  "http://localhost:5173/",
  "https://mill-management.vercel.app/api/v1",
  "https://mill-management.netlify.app",
];

// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "index.mjs",
//       "use": "@vercel/node"
//     }
//   ],
//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "/index.mjs",
//       "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//       "headers": {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
//         "Access-Control-Allow-Headers": "Content-Type,Authorization"
//       }
//     }
//   ]

// }

// CORS configuration with dynamic origin handling
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
//   credentials: true, // Allow credentials (e.g., cookies)
// };

// app.use(cors({
//   origin: 'https://mill-management.netlify.app', // replace with your Netlify URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // specify allowed methods
//   credentials: true // if you are using cookies or authorization headers
// }));

// Middleware setup function
export const setupMiddleware = (app) => {
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors({ origin: "*" }));
};
