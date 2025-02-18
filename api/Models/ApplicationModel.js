import mongoose from "mongoose";

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
    courseId: {
      type: String,
      required: [true, "Application must have a courseId"],
    },
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
