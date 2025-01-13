/* global process */
import jwt from "jsonwebtoken";

const generateToken = (adminId, role, dbName) => {
  const payload = {
    adminId,
    role,
    dbName,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { generateToken, verifyToken };
