const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const UserModel = require("../../model/User");
const validationError = require("../../utils/validationError");
const BorderList = require("../border/model");

//  > ====== SIGN UP CONTROLLER ==========
const signupController = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      profilePic,
      address,
    } = req.body;

    const salt = await bcrypt.genSalt(15);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePic,
      role: "border",
      address: address,
    });

    const saveUser = await createUser.save();

    let token = jwt.sign(
      {
        firstName: saveUser.firstName,
        userId: saveUser._id,
        role: "border",
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    // findData
    const findUserData = await UserModel.findOne(
      { $or: [{ email }, { phoneNumber }] },
      { password: 0, _v: 0, confirmPassword: 0 }
    );

    res.json({
      message: "signup successfully",
      data: findUserData,
      token,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validation = validationError(error);
      if (validation) {
        return res.status(403).json(validation);
      }
    }
    console.log(error);
    error.status = 500;
    next(err);
  }
};

//  > ====== LOGIN CONTROLLER ==========
const loginController = async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;
  try {
    const findUser = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    // If user not found
    if (!findUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Password match
    let match = await bcrypt.compare(password, findUser.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT token generation
    let token = jwt.sign(
      {
        firstName: findUser.firstName,
        userId: findUser._id,
        role: findUser?.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    // get user data
    const findUserData = await UserModel.findOne(
      {
        $or: [{ email }, { phoneNumber }],
      },
      { password: 0, _v: 0 }
    );

    // Response
    res.status(200).json({
      message: "Login successful",
      data: findUserData,
      token,
    });
  } catch (error) {
    console.log(error);
    error.status = 500;
    next(error);
  }
};

// get by id
const getUserModelByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find the userModel document by its ID
    const userModel = await UserModel.findById(userId);
    if (!userModel) {
      return res.status(404).json({ message: "userModel not found" });
    }

    return res.status(200).json({ data: userModel });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

//  >======||  GET ALL USER ||========
const getAllUser = async (req, res, next) => {
  try {
    const allUser = await UserModel.find();

    res.status(201).json({ data: allUser });
  } catch (error) {}
};

//  => mill status
const millStatusController = async (req, res, next) => {
  const { millOff, fullMill, schedule } = req?.body;
  const { userId } = req.query;

  try {
    const targetUserId = userId || req.user?.userId;
    const isManager = req?.user?.role === "manager";

    if (userId && !isManager) {
      return res.status(403).json({ message: "UNAUTHORIZED" });
    }

    // MONTH SECTION START
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).toISOString();
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0, // Last day of the current month
      23, // Last hour of the day
      59, // Last minute of the hour
      59 // Last second of the minute
    ).toISOString();
    // DATE CALCULATION

    const findBorder = await BorderList.findOne({
      isTrash: false,
      border: targetUserId,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    if (!findBorder) {
      return res
        .status(403)
        .json({ message: "You are Not Current Month Border" });
    }

    // Retrieve all BorderList documents for the current month
    const borderLists = await BorderList.findOneAndUpdate(
      {
        isTrash: false,
        border: targetUserId,
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      },
      { $set: { millOff, fullMill, schedule } },
      { new: true }
    );

    const userMillActive = await UserModel.findOneAndUpdate(
      { _id: targetUserId },
      { $set: { millOff, fullMill, schedule } },
      { new: true }
    );

    res.status(201).json({
      data: { user: userMillActive, border: borderLists },
      message: "User Mill Count Active",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = {
  signupController,
  loginController,
  getAllUser,
  getUserModelByIdController,
  millStatusController,
};
