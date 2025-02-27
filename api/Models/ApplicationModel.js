import mongoose from "mongoose";
import Lead from "./leadsModel.js";

const applicationModel = mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, "Application must have a studentId"],
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    // courseId: {
    //   type: String,
    //   required: [true, "Application must have a courseId"],
    // },
    status: {
      type: String,
      required: [true, "Application must have a status"],
    },
    applicationDate: {
      type: Date,
      required: [true, "Application must have a applicationDate"],
    },
    remark: {
      type: String,
      required: [true, "Application must have a remark"],
    },
    university: {
      type: String,
      required: [true, "Application must have a university"],
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
