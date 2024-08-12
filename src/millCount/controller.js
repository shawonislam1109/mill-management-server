const UserModel = require("../../model/User");
const { activeMissPrice } = require("../../utils/activeMillPrice");
const BorderList = require("../border/model");
const BorderMillCount = require("./model");

//  >======||  GET  Border mill Count ||========
const getAllBorderMillCount = async (req, res, next) => {
  try {
    const borderMill = await BorderMillCount.find();

    res.status(201).json({ data: borderMill });
  } catch (error) {}
};

// @CREATE EACH AND EVERY BORDER MILL COUNT LIST
const createEachBorderMill = async (req, res, next) => {
  try {
    const borderList = await BorderList.find({ status: "ACTIVE" });

    // Use Promise.all to process all borders concurrently
    await Promise.all(
      borderList.map(async (border) => {
        // Corrected: await added to resolve the user promise
        const user = await UserModel.findOne({ _id: border?.border });

        if (!user) {
          console.error(`User not found for border ID: ${border?.border}`);
          return;
        }

        const { bill, mill } = activeMissPrice(user.fullMill, user.schedule);

        // Create and save the mill count if bill and mill exist
        if (bill && mill) {
          const millCount = new BorderMillCount({
            millCost: bill,
            millCount: mill,
            border: user._id,
            fullMill: user.fullMill,
            millOff: user.millOff,
            schedule: user.schedule,
          });
          await millCount.save();
        }

        // Update the corresponding BorderList
        if (border) {
          const updatedTotalBalance = border.totalBalance - bill;
          const newDueBalance =
            updatedTotalBalance < 0
              ? border.dueBalance + bill
              : border.dueBalance;

          await BorderList.findOneAndUpdate(
            { border: user._id },
            {
              $set: {
                totalBalance: Math.max(updatedTotalBalance, 0),
                dueBalance: newDueBalance,
                totalCost: border.totalCost + bill,
                totalMill: border.totalMill + mill,
              },
            },
            { new: true }
          );
        }
      })
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllBorderMillCount, createEachBorderMill };
