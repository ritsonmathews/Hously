const jwt = require("jsonwebtoken");

const authMiddleware = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, "handy-man");

      return decoded;
    } catch (error) {
      return next();
    }
  }

  return null;
};

module.exports = authMiddleware;
