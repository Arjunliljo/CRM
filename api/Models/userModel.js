import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User must have a name"],
      maxlength: [20, "User name should be less than 20 characters"],
      minlength: [3, "User name should be greater than 3 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User must have an email"],
      maxlength: [30, "Email should be less than 30 characters"],
      minlength: [3, "Email should be greater than 3 characters"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "User must have a phone number"],
      validate: {
        validator: function (value) {
          return value.length >= 10 && value.length <= 13;
        },
        message:
          "Enter a valid phone number with a length between 10 and 13 digits",
      },
    },
    password: {
      type: String,
      required: [true, "User must have a password"],
      minlength: [8, "Password must have at least 8 characters"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    image: {
      type: String,
      default:
        "https://cbbstwltufvzpsqvnahz.supabase.co/storage/v1/object/public/avatars/public/logoipsum.png",
    },
    changePasswordDate: Date,
    passwordResetOtp: String,
    otpExpires: Date,
    employeeId: {
      type: String,
      required: [true, "User must have an employee ID"],
      maxlength: [20, "Employee ID should be less than 20 characters"],
      minlength: [3, "Employee ID should be greater than 3 characters"],
    },
    addressOne: {
      type: String,
      required: [true, "User must have an address"],
      maxlength: [50, "User address should be less than 50 characters"],
      minlength: [4, "User address should be greater than 4 characters"],
    },
    addressTwo: {
      type: String,
      maxlength: [50, "User address should be less than 50 characters"],
      minlength: [4, "User address should be greater than 4 characters"],
    },
    autoAssign: {
      type: Boolean,
      default: false,
    },
    isLeadsAssign: {
      type: Boolean,
      default: false,
    },

    branches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
      },
    ],
    countries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
      },
    ],
    statuses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
      },
    ],
    defaultTabs: [String],

    tabs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
      },
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tabs",
    model: "Status",
  });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
