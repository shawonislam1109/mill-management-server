const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Error("Authorization header missing or invalid");
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new Error("Token not provided");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      throw new Error("Invalid token");
    }

    const { firstName, userId, role } = decoded;
    req.user = { firstName, userId, role };

    next();
  } catch (error) {
    throw new Error("unAuthorization");
  }
};

module.exports = { jwtVerify };
