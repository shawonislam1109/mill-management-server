import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";

// Import modules
import setRouters from "./Routes/mainRoutes.mjs";
import setErrorHandler from "./errorHandler/errorHandler.mjs";
import { createEachBorderMill } from "./src/millCount/controller.mjs";
import { setupMiddleware } from "./middleware/mainMiddleware.mjs";

// Initialize dotenv
dotenv.config();

const app = express();

// Use middleware
setupMiddleware(app);

// Use routes
setRouters(app);

// Error handling middleware
setErrorHandler(app);

// Cron job for Task A at 11:59 PM every day
// cron.schedule("59 23 * * *", () => {
//   createEachBorderMill();
// });

// Use the tasks route
app.use("/api/tasks", createEachBorderMill);

// Environment variables
const port = process.env.PORT || 9190;
const password = process.env.DB_PASSWORD;

async function run() {
  try {
    const uri = `mongodb+srv://mill_manage_ment:${password}@cluster0.5rnuhbi.mongodb.net/millManagement?ssl=true&retryWrites=true&w=majority`;

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
