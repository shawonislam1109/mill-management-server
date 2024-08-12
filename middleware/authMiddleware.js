const UserModel = require("../model/User");

exports.bindWithRequest = () => {
  return async (req, res, next) => {
    if (!req.token) {
      return res.status(401).j;
    }

    try {
      const findUser = await UserModel.findById(req.user._id);
      if (findUser) {
        req.user = findUser;
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  };
};
