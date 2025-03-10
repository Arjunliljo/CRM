import mongoose from "mongoose";

const applicationModel = mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: [true, "Application must have a lead"],
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      required: [true, "Application must have a status"],
    },
    applicationDate: {
      type: Date,
      default: Date.now,
      required: [true, "Application must have a applicationDate"],
    },
    remark: {
      type: String,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: [true, "Application must have a country"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Application must have a course"],
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
    followupDate: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
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
  { timestamps: true }
);
applicationModel.pre(/^find/, function (next) {
  this.populate("lead");
  next();
});
const Application = mongoose.model("Application", applicationModel);

export default Application;
