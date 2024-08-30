const { isTimestampInCurrentMonth } = require("../../utils/borderMonthCheck");
const BorderList = require("./model");
const BorderTransition = require("./transition/model");

// create
const createBorderListService = async (req, res, next) => {
  try {
    if (req?.user?.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    // DATE CALCULATION
    const currentDate = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).toISOString();
    const startOfNextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    ).toISOString();
    // DATE CALCULATION

    const borderDocument = await BorderList.findOne({
      border: req.body.border,
      isTrash: false,
      createdAt: {
        $gte: startOfMonth,
        $lt: startOfNextMonth,
      },
    });

    //  bua bill calculation start
    const totalBalanceBorder = req.body?.totalBalance - req.body?.buaBill;
    const dueBalanceBorder =
      totalBalanceBorder <= 0 ? Math.abs(totalBalanceBorder) : 0;
    //  bua bill calculation end

    if (!borderDocument) {
      // Check if no document exists
      const borderList = new BorderList({
        borderId: req?.user?.userId,
        isTrash: false,
        provideBalance: req.body?.totalBalance,
        ...req.body,
        totalBalance:
          totalBalanceBorder >= 0 ? Math.abs(totalBalanceBorder) : 0,
        dueBalance: dueBalanceBorder,
        totalCost: req.body?.buaBill,
      });

      const saveBorderList = await borderList.save();

      const borderTransition = new BorderTransition({
        border: req.body.border,
        payAmount: req.body?.totalBalance,
        totalBalance:
          totalBalanceBorder >= 0 ? Math.abs(totalBalanceBorder) : 0,
        dueBalance: dueBalanceBorder,
      });

      const borderTransitionSave = await borderTransition.save();

      return { saveBorderList, borderTransition: borderTransitionSave };
    } else {
      return res.status(409).json({
        message: "This border has already been created for this month.",
      });
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateBorderListService = async (req, res, next) => {
  try {
    const { borderId } = req.params;
    // destructuring
    const { totalBalance, status, totalMill, totalCost, dueBalance } = req.body;

    if (req?.user?.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    const findBorderList = await BorderList.findByIdAndUpdate(
      borderId,
      {
        $set: {
          borderId,
          totalBalance,
          status,
          totalMill,
          totalCost,
          dueBalance,
          isTrash: false,
        },
      },
      { new: true }
    );

    return findBorderList;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// DELETE
const deleteBorderListService = async (req, res, next) => {
  try {
    const { borderId } = req.params;

    if (req?.user?.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }
    const deletedBorderList = await BorderList.findByIdAndUpdate(
      borderId,
      {
        $set: {
          isTrash: true,
        },
      },
      { new: true }
    );

    return deletedBorderList;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// get by id
const getBorderListByIdService = async (req, res, next) => {
  try {
    const { borderId } = req.params;

    // Find the BorderList document by its ID
    const borderList = await BorderList.findById(borderId);

    if (!borderList) {
      return res.status(404).json({ message: "BorderList not found" });
    }

    return borderList;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const getAllBorderListsService = async (req, res, next) => {
  try {
    // DATE CALCULATION
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

    // Retrieve all BorderList documents for the current month
    const borderLists = await BorderList.find({
      isTrash: false,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    }).sort({ createAt: -1 });

    return borderLists;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

// month ways filer
const getAllBorderFilerMonthWays = async (req, res, next) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const monthDate = new Date(month);
    if (isNaN(monthDate)) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const monthValue = monthDate.getUTCMonth() + 1; // JavaScript months are 0-indexed
    const yearValue = monthDate.getUTCFullYear();

    // Retrieve all BorderList documents that match the specified month and year
    const borderLists = await BorderList.find({
      isTrash: false,
      $expr: {
        $and: [
          { $eq: [{ $month: "$createdAt" }, monthValue] },
          { $eq: [{ $year: "$createdAt" }, yearValue] },
        ],
      },
    }).sort({ createdAt: -1 });

    return borderLists;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = {
  createBorderListService,
  updateBorderListService,
  deleteBorderListService,
  getAllBorderListsService,
  getBorderListByIdService,
  getAllBorderFilerMonthWays,
};
