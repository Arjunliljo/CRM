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
    // university: {
    //   type: String,
    //   required: [true, "Application must have a university"],
    // },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
    },
    // course: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    // },
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

applicationModel.pre("save", async function (next) {
  const course = await Lead.findById(this.lead);
  console.log(course, "course");
  // Update lead with isStudent=true and add this application ID to applications array
  await Lead.findByIdAndUpdate(this.lead, {
    isStudent: true,
    $push: { application: this._id }
  });

  next();
});

const Application = mongoose.model("Application", applicationModel);

export default Application;
