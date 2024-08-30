const { model, Schema } = require("mongoose");

const bua = new Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
      require: [true, "Status is required"],
    },
    bill: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const BuaDetails = model("bua", bua);
module.exports = BuaDetails;
