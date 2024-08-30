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

exports.signupValidator = [
  // .custom((val) => /[^A-za-z0-9\s]/g.test(val))
  // .withMessage("Username not use unique characters"),
  check("email")
    .custom(async (email) => {
      let user = await UserModel.findOne({ email });
      if (user) {
        return Promise.reject("email all ready is use");
      }
    })
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be 8 characters"),
  check("address").notEmpty().withMessage("Address is required"),

  check("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isLength({ min: 9 })
    .withMessage("minium number will be 9 ")
    .isLength({ max: 15 })
    .withMessage("max number will be 15")
    .custom(async (phoneNumber) => {
      let findPhoneNumber = await UserModel.findOne({ phoneNumber });
      if (findPhoneNumber) {
        return Promise.reject("phone number is already use");
      }
    }),

  check("confirmPassword").custom((confirmPassword, { req, next }) => {
    if (confirmPassword !== req.body.password) {
      throw new Error("Password does not match");
    }
    return true;
  }),

  (req, res, next) => {
    const result2 = validationResult(req);
    // const result2 = result.formatWith((error) => error.msg).mapped();
    if (!result2.isEmpty()) {
      return res.status(422).json({ data: result2.errors });
    }
    next();
  },
];
