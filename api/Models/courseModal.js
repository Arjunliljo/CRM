import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    course: {
      type: String,
      required: [true, "University must be specified"],
    },
    fees: {
      type: String,
      required: [true, "Fees must be specified"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification must be specified"],
    },
    status: {
      type: String,
      required: [true, "Course must have a status"],
    },
    remark: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
