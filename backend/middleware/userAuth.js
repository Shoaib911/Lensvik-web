import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Attach user ID to request object
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Unauthorized, token invalid" });
  }
};

export default userAuth;
