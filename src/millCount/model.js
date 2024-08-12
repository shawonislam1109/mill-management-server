const { model, Schema } = require("mongoose");
const BorderList = require("../border/model");

const borderMillCount = new Schema(
  {
    border: {
      type: Schema.ObjectId,
      ref: BorderList,
    },
    fullMill: {
      type: Boolean,
    },
    schedule: {
      type: Array,
    },
    millCount: {
      type: Number,
    },
    millOff: {
      type: Boolean,
    },
    millCost: {
      type: Number,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const BorderMillCount = model("border-mill-count", borderMillCount);
module.exports = BorderMillCount;
