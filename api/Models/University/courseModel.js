import mongoose from "mongoose";
import University from "./universityModel.js";

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Course must have a name"],
    },
    university:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "University",
      },

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

courseSchema.pre("save", function(next) {
  console.log(this.university);
  University.findById(this.university)
    .then(university => {
      if (!university) {
        throw new Error("University not found");
      }

      university.courses.push(this._id);

      const uniqueQualifications = new Set([
        ...university.qualifications.map(q => q.toString()),
        ...this.qualification.map(q => q.toString())
      ]);
      university.qualifications = Array.from(uniqueQualifications);

      return university.save();
    })
    .then(() => next())
    .catch(err => next(err));
});

const Course = mongoose.model("Course", courseSchema);


export default Course;