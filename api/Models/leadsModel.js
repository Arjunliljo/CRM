import mongoose from "mongoose";
import ActivityLog from "./activityLog/activityLogModel.js";
import AppError from "../Utilities/appError.js";

const leadSchema = mongoose.Schema(
  {
    leadId: {
      type: String,
      unique: true,
      sparse: true,
    },

    leadSource: {
      type: String,
      enum: ["META", "MANUAL", "OTHER", "WHATSAPP"],
      default: "MANUAL",
    },
    name: {
      type: String,
      required: [true, "Lead must have a name"],
    },
    qualification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qualification",
      },
    ],
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
    campaignName: {
      type: String,
    },
    campaignId: {
      type: String,
    },
    attemps: {
      type: Number,
      default: 1,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      default: "67bb53bd944190352e29f75f",
    },

    isStudent: {
      type: Boolean,
      default: false,
    },

    assigned: {
      type: Number,
      default: 1,
    },

    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    remark: {
      type: String,
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
          default: "N/A",
        },
      ],
    },

    documents: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Document must have a name"],
          },
          filename: {
            type: String,
            required: [true, "Document must have a filename"],
          },
          url: {
            type: String,
            required: [true, "Document must have a url"],
          },
          isImportant: {
            type: Boolean,
            default: false,
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

    img: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    },

    followupDate: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },

    address: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

leadSchema.pre(/^find/, function (next) {
  this.populate({
    path: "users",
    select: "name role",
  });
  next();
});

leadSchema.pre("save", async function (next) {
  try {
    await ActivityLog.create({
      leadID: this._id,
      statusChange: [{ statusID: "67bb53bd944190352e29f75f" }],
    });
  } catch (e) {
    next();
  }

  next();
});

leadSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (!update)
      return next(new AppError("Failed to create Activity Log", 400));

    const docId = this.getQuery()._id;
    if (!docId) return next(new AppError("Lead ID not found", 400));

    let activityLog = await ActivityLog.findOne({ leadID: docId });

    // Create new activity log if it doesn't exist
    if (!activityLog) {
      activityLog = await ActivityLog.create({
        leadID: docId,
        statusChange: [{ statusID: "67bb53bd944190352e29f75f" }],
      });
    }

    // Check for status in $set operator if using update operators
    const newStatus = update.status || (update.$set && update.$set.status);
    if (newStatus) {
      // Check if the last status is different from the new status
      const lastStatus =
        activityLog.statusChange[activityLog.statusChange.length - 1];
      if (
        !lastStatus ||
        lastStatus.statusID.toString() !== newStatus.toString()
      ) {
        activityLog.statusChange.push({ statusID: newStatus });
        await activityLog.save();
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
