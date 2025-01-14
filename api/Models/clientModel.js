import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin must have a name"],
      maxlength: [30, "Name should be less than 30 characters"],
    },

    logo: {
      type: String,
      default:
        "https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png",
    },
    location: {
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
    },
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
