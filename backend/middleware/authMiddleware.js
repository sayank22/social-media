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
    console.log("✅ Decoded user:", decoded); // check this in your terminal
    
    // Set userId in the request object for use in routes
    req.userId = decoded.userId;
    
    // Proceed to the route handler
    next(); 
  } catch (err) {
    // Handle invalid or expired token
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
