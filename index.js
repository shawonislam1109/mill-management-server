const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const path = require("path");
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

// Cron job for Task A at 12:00 PM every day
// cron.schedule("0 12 * * *", () => {
//   console.log("Running Task A at 12:00 PM");
// });
// Cron job for Task A at 12:00 PM every day
cron.schedule("* * * * *", (req, res, next) => {
  createEachBorderMill(req, res, next);
  console.log("cron done");
});

const port = process.env.PORT || 9190;

// connect mongoose
// setupDatabase(app);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  })
  .catch((err) => {
    return console.log(err);
  });
