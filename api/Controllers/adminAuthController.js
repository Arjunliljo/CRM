import { connectToUserAdminDb } from "../middlewares/dynamicDbContext.js";
import Admin from "../Models/adminModel.js";
import bcrypt from "bcrypt";
import catchAsync from "../Utilities/catchAsync.js";
import { generateToken } from "../Utilities/jwt.js";

const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password, databaseName } = req.body;

    // Check if the user already exists
    const existingUserAdmin = await Admin.findOne({ email });
    if (existingUserAdmin) {
      return res
        .status(400)

        .json({ message: "An admin with this email already exists" });
    }
    // Calculate the count of existing documents
    const existingCount = await Admin.countDocuments();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
      databaseName,
      count: existingCount + 1, //and assigned the count as identifier
    });

    await user.save();

    // Create the school-specific database connection
    // await connectToUserAdminDb(user._id);

    // Generate JWT token
    // const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: `Admin for ${name} created successfully`,
      //   token,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const signin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if the admin exists
  const existingAdmin = await Admin.findOne({ email });
  if (!existingAdmin) {
    return res
      .status(400)
      .json({ message: "Invalid email or password. Admin not found." });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(
    password,
    existingAdmin.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  // Ensure the admin's database is connected
  const adminDbConnection = await connectToUserAdminDb(existingAdmin._id);
  if (!adminDbConnection) {
    return res.status(500).json({
      message: "Failed to connect to the admin's database. Please try again.",
    });
  }

  // Generate JWT token
  const token = generateToken(existingAdmin._id, existingAdmin.role);

  res.status(200).json({
    message: `Welcome back, ${existingAdmin.name}!`,
      token,
    userId: existingAdmin._id,
  });
});

export { signup, signin };
