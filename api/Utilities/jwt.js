import jwt from "jsonwebtoken";

const generateToken = (adminId, role, dbName) => {
  const payload = {
    adminId,
    role,
    dbName, // Add the database name or identifier here
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
