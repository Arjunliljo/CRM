import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course must have a name"],
    },
    university: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
      },
    ],
    fee: {
      type: Number,
      required: [true, "Course must have a fees"],
    },
    duration: {
      type: Number,
    },
    qualification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qualification",
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
