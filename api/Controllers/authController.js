import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";

const KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 10 * 2;
  return jwt.sign({ id, exp: expiresIn }, KEY);
};
const sendToken = (user, statusCode, res, next) => {
  const token = generateToken(user._id);
  if (!token) return next(new AppError("Server failed to create token", 500));

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(statusCode).json({
    status: "Success",
    message: "Successfully logged in",
    user,
  });
};

const createUser = catchAsync(async (req, res, next) => {
  console.log('api called !!!', req.body);
  const user = await User.create(req.body);
  // sendToken(user, 201, res, next);
  res.status(200).json({message:'user added succesfully'})
});

export { createUser };