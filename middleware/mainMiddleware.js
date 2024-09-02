const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Allowed origins array
const allowedOrigins = ["http://localhost:5173/"];

// CORS configuration with dynamic origin handling
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (e.g., cookies)
};

//  middleware
const middleware = [
  morgan("dev"),
  express.urlencoded({ extended: true }),
  express.json(),
  cors(allowedOrigins),
];

module.exports = (app) => {
  app.use(middleware);
};
