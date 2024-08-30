const { model, Schema } = require("mongoose");
const BorderList = require("../model");
const { ObjectId } = Schema;

const borderTransition = new Schema(
  {
    border: {
      type: ObjectId,
      ref: BorderList,
      required: [true, "Border Id required"],
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    payAmount: {
      type: Number,
      default: 0,
    },
    dueBalance: {
      type: Number,
      default: 0,
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

const BorderTransition = model("transition", borderTransition);
module.exports = BorderTransition;
