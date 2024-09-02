const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cron = require("node-cron");
const app = express();

// Import modules
const setRouters = require("./Routes/mainRoutes");
const setMiddleware = require("./middleware/mainMiddleware");
const setErrorHandler = require("./errorHandler/errorHandler");
const { createEachBorderMill } = require("./src/millCount/controller");

// Use middleware
setMiddleware(app);

// Use routes
setRouters(app);

// Error handling middleware
setErrorHandler(app);

// Cron job for Task A at 11:59 PM every day
cron.schedule("59 23 * * *", () => {
  createEachBorderMill();
});

// Environment variables
const port = process.env.PORT || 9190;
const user = process.env.USERNAME_BD;
const password = process.env.DB_PASSWORD;

async function run() {
  try {
    const uri = `mongodb+srv://mill_manage_ment:Mzo9xp69yF8axaQr@cluster0.5rnuhbi.mongodb.net/millManagement?ssl=true&retryWrites=true&w=majority`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
}

run();
