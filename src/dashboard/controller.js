const {
  getCurrentMonthTotals,
  getCurrentMonthTotalsFilterMonthly,
} = require("./service");

// border list get controller
const getCurrentTotalController = async (req, res, next) => {
  try {
    const currentMonth = await getCurrentMonthTotals(req, res, next);
    return res.status(200).json({ data: currentMonth });
  } catch (error) {
    next(error);
  }
};
const getCurrentTotalControllerMonthlyFilter = async (req, res, next) => {
  try {
    const currentMonth = await getCurrentMonthTotalsFilterMonthly(
      req,
      res,
      next
    );
    return res.status(200).json({ data: currentMonth });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCurrentTotalController,
  getCurrentTotalControllerMonthlyFilter,
};
