// middleware/requireRole.js
const requireRole = (role) => {
  return (req, res, next) => {
    // req.user should be set by your auth middleware (JWT, session, etc.)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

module.exports = requireRole;