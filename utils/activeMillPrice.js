const millPrice = {
  DINNER: 40,
  BREAKFAST: 10,
  LUNCH: 40,
};

const activeMissPrice = (fullMill, schedule) => {
  if (fullMill) {
    return { bill: 90, mill: 2.5 };
  } else if (Array.isArray(schedule) && schedule.length > 0) {
    let scheduleBill = 0;
    let scheduleMill = 0;
    schedule.forEach((item) => {
      if (millPrice[item] !== undefined) {
        if (item === "DINNER") {
          scheduleMill += 1;
        }
        if (item === "LUNCH") {
          scheduleMill += 1;
        }
        if (item === "BREAKFAST") {
          scheduleMill += 0.5;
        }
        scheduleBill += millPrice[item];
      }
    });
    return { bill: scheduleBill, mill: scheduleMill };
  } else {
    return { bill: 0, mill: 0 };
  }

  0; // Return 0 if schedule is not valid or empty
};

module.exports = { activeMissPrice };
