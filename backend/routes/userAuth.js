const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "bookStore123", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // decoded payload
    next();
  });
};

module.exports = {authenticateToken};
