const UserModel = require("../../model/User");
const { activeMissPrice } = require("../../utils/activeMillPrice");
const { currentMonthFilter } = require("../../utils/CurrentMonthFilter");
const BorderList = require("../border/model");
const BuaDetails = require("../bua/model");
const BorderMillCount = require("./model");

//  >======||  GET  Border mill Count ||========
const getAllBorderMillCount = async (req, res, next) => {
  try {
    const borderMill = await BorderMillCount.find().sort({ createdAt: -1 });

    res.status(201).json({ data: borderMill });
  } catch (error) {}
};

// @CREATE EACH AND EVERY BORDER MILL COUNT LIST
const createEachBorderMill = async () => {
  try {
    // Fetch BUA details
    const buaDetails = await BuaDetails.findOne({ status: "ACTIVE" });
    if (!buaDetails) return; // Exit if no active BUA details found

    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter();

    // Fetch active border list documents
    const activeBorders = await BorderList.find({
      status: "ACTIVE",
      isTrash: false,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    });

    // Process each border concurrently
    await Promise.all(
      activeBorders.map(async (border) => {
        try {
          if (!border.fullMill && !border.schedule) return;

          const { bill, mill } = activeMissPrice(
            border.fullMill,
            border.schedule
          );

          if (bill && mill) {
            // Create and save the mill count
            const millCount = new BorderMillCount({
              millCost: bill,
              millCount: mill,
              border: border.border,
              fullMill: border.fullMill,
              millOff: border.millOff,
              schedule: border.schedule,
            });
            await millCount.save();

            // Update the corresponding BorderList
            const updatedTotalBalance = border.totalBalance - bill;
            const newDueBalance =
              updatedTotalBalance < 0
                ? border.dueBalance + bill - border.totalBalance
                : border.dueBalance;

            const data = await BorderList.findOneAndUpdate(
              { _id: border._id },
              {
                totalBalance: Math.max(updatedTotalBalance, 0),
                dueBalance: newDueBalance,
                totalCost: border.totalCost + bill,
                totalMill: border.totalMill + mill,
              },
              { new: true }
            );
          }
        } catch (error) {
          console.error(`Error processing border ID: ${border.border}`, error);
        }
      })
    );
  } catch (error) {
    console.error("Error creating border mills:", error);
  }
};

// @GET MILL COUNT HISTORY FOR CURRENT MONTH
const getAllMillHistory = async (req, res, next) => {
  try {
    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter();

    const find = await BorderMillCount.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: find });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching mill count history" });
  }
};

// @GET MILL COUNT HISTORY BY ID FOR CURRENT MONTH
const getByIdMillHistory = async (req, res, next) => {
  const { borderId } = req.params;
  try {
    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter();

    const find = await BorderMillCount.find({
      border: borderId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });
    if (find) {
      res.status(200).json({ data: find });
    } else {
      res
        .status(404)
        .json({ message: "Mill history not found for the current month" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching mill count history" });
  }
};

//  this month transition  history get
const millHistoryFilter = async (req, res, next) => {
  try {
    const { borderId } = req.params;
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthDate = new Date(month);
    if (isNaN(monthDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter(month);
    // find data bae
    const findMillHistory = await BorderMillCount.find({
      border: borderId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: findMillHistory });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBorderMillCount,
  createEachBorderMill,
  getAllMillHistory,
  getByIdMillHistory,
  millHistoryFilter,
};
