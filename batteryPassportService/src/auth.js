const jwt = require("jsonwebtoken");

module.exports = (roleRequired) => (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (roleRequired && decoded.role !== roleRequired)
      return res.status(403).json({ message: "Forbidden" });
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};