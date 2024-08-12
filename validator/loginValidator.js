const { validationResult, check } = require("express-validator");
const UserModel = require("../model/User");

exports.loginValidator = [
  check("password").notEmpty().withMessage("Password is required"),
  // Custom validation function to check either email or phone number is provided
  (req, res, next) => {
    const { email, phoneNumber } = req.body;
    if (!email && !phoneNumber) {
      return res
        .status(422)
        .json({ error: "Please provide either email or phone number" });
    }
    next();
  },
  // Additional validation for email and phone number
  check("email").optional().isEmail().withMessage("Invalid email"),
  check("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  // Validation result handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
