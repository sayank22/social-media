import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the token is present and properly formatted
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Logging decoded user info (in development, ensure this is removed in production)
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Decoded user:", decoded); 
    }

    // Set userId in the request object for use in routes
    req.userId = decoded.userId;
    
    // Proceed to the route handler
    next(); 
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      // Handle token expiration
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    if (err.name === "JsonWebTokenError") {
      // Handle invalid token error
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Handle other JWT errors
    console.error("❌ Token verification error:", err);
    return res.status(500).json({ message: "Server error: Failed to verify token" });
  }
};
