const BorderList = require("../model");
const BorderTransition = require("./model");
const mongoose = require("mongoose");

const balanceUpdate = async (req, res, next) => {
  // START THE SESSION

  // const session = await mongoose.startSession();
  // session.startTransaction();
  try {
    const { dueBalance, totalBalance, balanceAdd, provideBalance } = req.body;
    const { borderId } = req.params;

    if (req?.user?.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    // ADD BALANCE  CALCULATION
    const remindBalance = balanceAdd - dueBalance;

    const updateBalance = await BorderList.findOneAndUpdate(
      { border: borderId },
      {
        $set: {
          totalBalance:
            totalBalance + remindBalance > 0
              ? Math.abs(totalBalance + remindBalance)
              : 0,
          dueBalance:
            totalBalance + remindBalance > 0
              ? 0
              : Math.abs(totalBalance + remindBalance),
          provideBalance: provideBalance + balanceAdd,
        },
      },
      { new: true }
    );

    const borderTransition = new BorderTransition({
      border: borderId,
      payAmount: balanceAdd,
      totalBalance:
        totalBalance + remindBalance > 0
          ? Math.abs(totalBalance + remindBalance)
          : 0,
      dueBalance:
        totalBalance + remindBalance > 0
          ? 0
          : Math.abs(totalBalance + remindBalance),
    });

    const transition = await borderTransition.save();

    //  commit the transition
    // await session.commitTransaction();
    // session.endSession();

    // response the balance successfully
    res.status(201).json({
      message: "Balance Add Successfully",
      data: { updateBalance: updateBalance, transition: transition },
    });
  } catch (error) {
    // Abort the transaction on error
    // await session.abortTransaction();
    // session.endSession();

    next(error);
  }
};

//  this month transition  history get
const transitionHistory = async (req, res, next) => {
  try {
    const { borderId } = req.params;
    const startOfMonth = new Date(new Date().setDate(1)); // Start of the current month
    const endOfMonth = new Date(
      new Date().setMonth(new Date().getMonth() + 1, 0)
    ); // End of the current month

    const borderTransition = await BorderTransition.find({
      border: borderId,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    if (borderTransition) {
      res.status(200).json({ data: borderTransition });
    } else {
      res.status(404).json({
        message: "Transition history not found for the current month",
      });
    }
  } catch (error) {
    next(error);
  }
};
//  this month transition  history get
const transitionHistoryFilter = async (req, res, next) => {
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

    const monthValue = monthDate.getUTCMonth() + 1;
    const yearValue = monthDate.getUTCFullYear();

    // find data bae
    const findTransitionHistory = await BorderTransition.find({
      border: borderId,
      $expr: {
        $and: [
          { $eq: [{ $month: "$createdAt" }, monthValue] },
          { $eq: [{ $year: "$createdAt" }, yearValue] },
        ],
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({ data: findTransitionHistory });
  } catch (error) {
    next(error);
  }
};

module.exports = { balanceUpdate, transitionHistory, transitionHistoryFilter };
