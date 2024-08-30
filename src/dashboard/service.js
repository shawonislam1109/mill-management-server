const BorderList = require("../border/model");

const getCurrentMonthTotals = async (req, res, next) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);

    const result = await BorderList.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          isTrash: false,
        },
      },
      {
        $group: {
          _id: null,
          provideBalance: { $sum: "$provideBalance" },
          buaBill: { $sum: "$buaBill" },
          totalBalance: { $sum: "$totalBalance" },
          totalDue: { $sum: "$dueBalance" },
          totalMill: { $sum: "$totalMill" },
          totalCost: { $sum: "$totalCost" },
        },
      },
    ]);

    return result[0];
  } catch (error) {
    next(error);
  }
};

module.exports = { getCurrentMonthTotals };
