import mongoose from "mongoose";

const leadSchema = mongoose.Schema(
  {
    leadId: {
      type: String,
      unique: true,
      sparse: true,
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
      unique: true,
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
        ref: "Status",
      },
    ],

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
    application: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
