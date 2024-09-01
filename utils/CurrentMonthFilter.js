const currentMonthFilter = (month) => {
  let currentDate = "";

  if (month) {
    currentDate = new Date(month);
  } else {
    currentDate = new Date();
  }
  // MONTH SECTION START
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

  return { startOfMonth, endOfMonth };
  // DATE CALCULATION
};

module.exports = { currentMonthFilter };
