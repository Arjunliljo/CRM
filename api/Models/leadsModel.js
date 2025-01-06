import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lead must have a name"],
    },
    email: {
      type: String,
      required: [true, "Lead must have an email"],
      maxlength: [30, "Email should be less than 30 characters"],
      minlength: [3, "Email should be greater than 3 characters"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Lead must have an email"],

      validate: {
        validator: function (value) {
          return value.length >= 10 && value.length <= 13;
        },
        message:
          "Enter a valid phone number with a length between 10 and 13 digits",
      },
    },
    campaign: {
      type: String,
      required: [true, "Lead must have a campaign"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
