import { model, Schema } from "mongoose";

const userModel = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
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
    role: {
      type: String,
      default: "merchant",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("users", userModel);
export default UserModel;
