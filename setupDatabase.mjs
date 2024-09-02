import mongoose from "mongoose";
import Supplier from "./model/supplier.mjs";
import dotenv from "dotenv";

// Initialize dotenv
dotenv.config();

export async function setupDatabase(app) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Ensure indexes for each model
    await Supplier.ensureIndexes();

    const port = process.env.PORT || 3000; // Ensure `port` is defined
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });

    // You can ensure indexes for other models similarly
    // await AnotherModel.ensureIndexes();
    // console.log("Indexes ensured for AnotherModel model");
  } catch (err) {
    console.error("Could not connect to MongoDB or ensure indexes...", err);
  } finally {
    // Close the mongoose connection if not in use or during shutdown
    // Comment this out if you want the connection to stay open
    // mongoose.connection.close();
  }
}
