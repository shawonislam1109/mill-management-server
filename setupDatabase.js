const mongoose = require("mongoose");
const Supplier = require("./model/supplier");
require("dotenv").config();
// Import other models as needed
// const AnotherModel = require("./models/AnotherModel");

async function setupDatabase(app) {
  try {
    const mongodb = await mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        Supplier.ensureIndexes();
        app.listen(port, () => {
          console.log(`Server Running on port ${port}`);
        });
      });

    // Ensure indexes for each model
    // await Supplier.ensureIndexes();
    return mongodb;

    // Ensure indexes for other models
    // await AnotherModel.ensureIndexes();
    // console.log("Indexes ensured for AnotherModel model");
  } catch (err) {
    console.error("Could not connect to MongoDB or ensure indexes...", err);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = { setupDatabase };
