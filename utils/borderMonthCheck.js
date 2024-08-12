function isTimestampInCurrentMonth(timestamp) {
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  const now = new Date(); // Get the current date

  // Extract the year and month using local time
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth();

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Check if the year and month of the timestamp match the current year and month
  return dateYear === currentYear && dateMonth === currentMonth;
}

module.exports = { isTimestampInCurrentMonth };
