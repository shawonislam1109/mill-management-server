import { model, Schema } from "mongoose";
import BorderList from "../model.mjs";
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
export default BorderTransition;
