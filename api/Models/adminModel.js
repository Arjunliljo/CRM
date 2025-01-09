import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    //name to show in panel
    name: {
      type: String,
      required: [true, "Admin must have a name"],
      maxlength: [30, "Name should be less than 30 characters"],
    },
    // logo need ?
    email: {
      type: String,
      unique: true,
      required: [true, "Admin must have an email"],
    },
    password: {
      type: String,
      required: [true, "Admin must have a password"],
    },
    phone: {
      type: String,
      required: [true, "Admin must have a phone number"],
    },
    count: {
      type: Number,
    },
    databaseName: {
      type: String,
      unique: true,
      required: [true, "Database name is required for the admin"],
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
