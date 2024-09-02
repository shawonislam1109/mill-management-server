import UserModel from "../model/User.mjs";

export const bindWithRequest = () => {
  return async (req, res, next) => {
    if (!req.token) {
      return res.status(401).json({ message: "Unauthorized" }); // Ensure a valid response
    }

    try {
      const findUser = await UserModel.findById(req.user._id);
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.status(404).json({ message: "User not found" }); // Handle user not found
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
