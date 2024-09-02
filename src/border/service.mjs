import { currentMonthFilter } from "../../utils/CurrentMonthFilter.mjs";
import BorderList from "./model.mjs";
import BorderTransition from "./transition/model.mjs";

// create
export const createBorderListService = async (req, res, next) => {
  try {
    if (req?.user?.role !== "manager") {
      return res.status(403).json({ message: "FORBIDDEN ACCESS" });
    }

    // DATE CALCULATION
    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter();
    // DATE CALCULATION

    const borderDocument = await BorderList.findOne({
      border: req.body.border,
      isTrash: false,
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
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
export const updateBorderListService = async (req, res, next) => {
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
export const deleteBorderListService = async (req, res, next) => {
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
export const getBorderListByIdService = async (req, res, next) => {
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

export const getAllBorderListsService = async (req, res, next) => {
  try {
    // DATE CALCULATION
    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter();

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
export const getAllBorderFilerMonthWays = async (req, res, next) => {
  try {
    const { month } = req.query;

    // DATE CALCULATION
    // MONTH SECTION START
    const { startOfMonth, endOfMonth } = currentMonthFilter(month);

    // Retrieve all BorderList documents that match the specified month
    const borderLists = await BorderList.find({
      isTrash: false,
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    }).sort({ createdAt: -1 });

    return borderLists;
  } catch (error) {
    error.status = 500;
    next(error);
  }
};
