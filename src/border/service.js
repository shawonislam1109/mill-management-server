const { isTimestampInCurrentMonth } = require("../../utils/borderMonthCheck");
const BorderList = require("./model");

// create
const createBorderListService = async (req, res, next) => {
  try {
    console.log("req?.user?.role", req?.user?.role);
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

    if (!borderDocument) {
      // Check if no document exists
      const borderList = new BorderList({
        borderId: req?.user?.userId,
        isTrash: false,
        provideBalance: req.body?.totalBalance,
        ...req.body,
      });

      const saveBorderList = await borderList.save();
      return saveBorderList;
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
    });

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
};
