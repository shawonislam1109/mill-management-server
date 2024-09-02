import { model, Schema } from "mongoose";
import UserModel from "../../model/User.mjs";
const { ObjectId } = Schema;

const borderList = new Schema(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    border: {
      type: ObjectId,
      ref: UserModel,
      required: [true, "Border Id required"],
    },
    totalBalance: {
      type: Number,
      default: 0,
    },
    provideBalance: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
    },
    totalMill: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    dueBalance: {
      type: Number,
      default: 0,
    },
    buaBill: {
      type: Number,
      default: 0,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
    fullMill: {
      type: Boolean,
    },
    schedule: {
      type: Array,
    },
    millOff: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const BorderList = model("BorderList", borderList);
export default BorderList;
