const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cron = require("node-cron");

// import
const setRouters = require("./Routes/mainRoutes");
const setMiddleware = require("./middleware/mainMiddleware");
const setErrorHandler = require("./errorHandler/errorHandler");
const { createEachBorderMill } = require("./src/millCount/controller");

// Usings middleware from middleware directory
setMiddleware(app);

// Usings route from route directory
setRouters(app);

// import error handler
setErrorHandler(app);

// Cron job for Task A at 11:59 PM every day
// cron.schedule("59 23 * * *", () => {
//   createEachBorderMill();
// });
cron.schedule("* * * * *", () => {
  createEachBorderMill();
  console.log("cron is executed");
});

const port = process.env.PORT || 9190;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// BD USER AND PASSWORD
const user = process.env.USERNAME_BD;
const password = process.env.DB_PASSWORD;
async function run() {
  try {
    // Correct the connection string format
    // const uri = `mongodb+srv://mill_manage_ment:${password}@cluster0.5rnuhbi.mongodb.net/millManagement?ssl=true&replicaSet=atlas-xxx-shard-0&authSource=admin&retryWrites=true&w=majority`;
    const uri = `mongodb+srv://mill_manage_ment:${password}@cluster0.5rnuhbi.mongodb.net/millManagement?ssl=true&retryWrites=true&w=majority`;

    // Create a Mongoose client with the MongoClientOptions object
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);

    // Start the Express.js server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  }
}

run();
