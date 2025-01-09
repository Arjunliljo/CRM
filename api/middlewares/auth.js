import { verifyToken } from "../Utilities/jwt";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};
