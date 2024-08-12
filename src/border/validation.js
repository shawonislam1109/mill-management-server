const { validationResult, check } = require("express-validator");
const UserModel = require("../model/User");

exports.resultsValidator = (req) => {
  const messages = [];
  if (!validationResult(req).isEmpty()) {
    const errors = validationResult(req).array();
    for (const i of errors) {
      messages.push(i);
    }
  }
  return messages;
};

exports.borderList = [
  check("totalBalance")
    .notEmpty()
    .withMessage("Total balance is required")
    .isNumeric()
    .withMessage("Total balance must be a number"),
  ,
  check("totalMill")
    .notEmpty()
    .withMessage("totalMill is required")
    .isNumeric()
    .withMessage("totalMill must be a number"),
  ,
  check("totalCost")
    .notEmpty()
    .withMessage("totalCost is required")
    .isNumeric()
    .withMessage("totalCost must be a number"),
  ,
  check("dueBalance")
    .notEmpty()
    .withMessage("dueBalance is required")
    .isNumeric()
    .withMessage("dueBalance must be a number"),
  ,
  (req, res, next) => {
    const result2 = validationResult(req);
    // const result2 = result.formatWith((error) => error.msg).mapped();
    if (!result2.isEmpty()) {
      return res.status(422).json({ data: result2.errors });
    }
    next();
  },
];
