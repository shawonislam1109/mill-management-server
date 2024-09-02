import {
  getCurrentMonthTotals,
  getCurrentMonthTotalsFilterMonthly,
} from "./service.mjs";

// border list get controller
export const getCurrentTotalController = async (req, res, next) => {
  try {
    const currentMonth = await getCurrentMonthTotals(req, res, next);
    return res.status(200).json({ data: currentMonth });
  } catch (error) {
    next(error);
  }
};
export const getCurrentTotalControllerMonthlyFilter = async (
  req,
  res,
  next
) => {
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
