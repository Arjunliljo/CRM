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
      // required: [true, "Application must have a university"],
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

const Application = mongoose.model("Application", applicationModel);

export default Application;
