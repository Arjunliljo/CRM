import Admin from "../Models/adminModel.js";
import bcrypt from "bcrypt";
import catchAsync from "../Utilities/catchAsync.js";
import { generateToken } from "../Utilities/jwt.js";

const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password, databaseName, location } = req.body;

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

    // Get the image filename from the uploaded file
    const logo = req.file ? req.file.filename : null;

    const user = new Admin({
      name,
      email,
      phone,
      password: hashedPassword,
      databaseName,
      count: existingCount + 1, // Assigned the count as identifier
      logo,
      location: location,
    });

    await user.save();

    res.status(201).json({
      message: `Admin for ${name} created successfully`,
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

  // Validate password
  const isPasswordValid = await bcrypt.compare(
    password,
    existingAdmin.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  // Generate JWT with admin's database name
  const token = generateToken(
    existingAdmin._id,
    "admin",
    existingAdmin.databaseName
  );

  res.status(200).json({
    message: `Welcome back, ${existingAdmin.name}!`,
    token,
    userId: existingAdmin._id,
  });
});

export { signup, signin };
