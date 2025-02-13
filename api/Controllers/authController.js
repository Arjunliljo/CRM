import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import catchAsync from "../Utilities/catchAsync.js";
import AppError from "../Utilities/appError.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const KEY = process.env.JWT_SECRET;

const generateToken = (id) => {
  const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours
  return jwt.sign({ id, exp: expiresIn }, KEY);
};

const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    // sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};

const createUser = catchAsync(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(new AppError("Email already registered", 400));
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  sendToken(newUser, 201, res);
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .populate("role")
    .populate("branches")
    .populate("countries")
    .populate("statuses")
    .populate("tabs")
    .populate("roles");

  if (!user) {
    return next(new AppError("Invalid email or password", 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = generateToken(user._id);
  if (!token) {
    throw new AppError("Server failed to create token", 500);
  }

  const sanitizedUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    employeeId: user.employeeId,
    role: user.role,
    branches: user.branches,
    countries: user.countries,
    statuses: user.statuses,
    defaultTabs: user.defaultTabs,
    tabs: user.tabs,
    roles: user.roles,
    autoAssign: user.autoAssign,
    isLeadsAssign: user.isLeadsAssign,
    image: user.image,
    token: token,
  };

  console.log({ sanitizedUser });
  sendToken(sanitizedUser, 200, res);
});

const verify = catchAsync(async (req, res, next) => {
  let isLoggedIn = false;
  // 1) Get the token and check its there

  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ status: "Failed", message: "Logged in failed", isLoggedIn });

  // 2) Varify token
  const decode = jwt.verify(token, KEY);
  const user = await User.findById(decode.id);
  if (!user) {
    return res.status(404).json({
      status: "Failed",
      message: "The User belong to this token is not exist",
      isLoggedIn,
    });
  }

  isLoggedIn = true;

  res.status(200).json({
    status: "Success",
    message: "Successfully Logged in",
    isLoggedIn,
    user,
  });
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    status: "Success",
    message: "Successfully Logged out",
  });
});

export { createUser, loginUser, verify, logout };
