import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided, authorization denied." });
    }

    const token = authHeader.split(" ")[1];
    
    // Replace "your_jwt_secret" with process.env.JWT_SECRET if you use environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    
    req.user = decoded; // Attaches doctor id to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid or has expired." });
  }
};

export default authMiddleware;