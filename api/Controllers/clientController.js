import bcrypt from "bcryptjs";
import catchAsync from "../Utilities/catchAsync.js";
import { generateToken } from "../Utilities/jwt.js";
import Client from "../Models/clientModel.js";

const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password, location, logo } = req.body;

    // Check if the user already exists
    const existingUserClient = await Client.findOne({ email });
    if (existingUserClient) {
      return res
        .status(400)
        .json({ message: "An Client with this email already exists" });
    }
    // Calculate the count of existing documents
    const existingCount = await Client.countDocuments();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Get the image filename from the uploaded file

    const user = new Client({
      name,
      email,
      phone,
      password: hashedPassword,
      count: existingCount + 1, // Assigned the count as identifier
      logo,
      location: location,
    });

    await user.save();

    res.status(201).json({
      message: `Client for ${name} created successfully`,
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

const signin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if the Client exists
  const existingClient = await Client.findOne({ email });
  if (!existingClient) {
    return res
      .status(400)
      .json({ message: "Invalid email or password. Client not found." });
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(
    password,
    existingClient.password
  );
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  // Generate JWT with Client's database name
  const token = generateToken(
    existingClient._id,
    "Client",
    existingClient.databaseName
  );

  res.status(200).json({
    message: `Welcome back, ${existingClient.name}!`,
    token,
    userId: existingClient._id,
  });
});

export { signup, signin };
