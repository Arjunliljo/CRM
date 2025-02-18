import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    leadId: {
      type: String,
      unique: true,
      sparse: true, // Allows null/undefined values to not trigger unique constraint
    },
    leadSource: {
      type: String,
      enum: ["META", "MANUAL", "OTHER"],
      default: "MANUAL",
    },
    name: {
      type: String,
      required: [true, "Lead must have a name"],
    },
    email: {
      type: String,
      maxlength: [30, "Email should be less than 30 characters"],
      minlength: [3, "Email should be greater than 3 characters"],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Lead must have a phone number"],
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
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    status: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status", //not required because meta will not have status
      },
    ],
    // to check student or leads (become student when they assigned to branch )
    isStudent: {
      type: Boolean,
      default: false,
    },
    // to check student shared to users
    isSharedToUsers: {
      type: Boolean,
      default: false,
    },
    remark: {
      type: String,
      // maxlength: [100, "Remark should be less than 100 characters"],
      minlength: [3, "Remark should be greater than 3 characters"],
    },
    helpers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    countries: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Country",
        },
      ],
    },
    documents: {
      type: [
        {
          name: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
