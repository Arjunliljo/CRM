import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Client must have a name"],
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
      required: [true, "Client must have an email"],
    },
    password: {
      type: String,
      required: [true, "Client must have a password"],
    },
    phone: {
      type: String,
      required: [true, "Client must have a phone number"],
    },
    count: {
      type: Number,
    },

  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
