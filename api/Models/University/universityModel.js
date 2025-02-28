import mongoose from "mongoose";

const universitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "University must have a name"],
      unique: true,
    },
    img: {
      type: String,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: [true, "Course must have a country"],
    },
    qualifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Qualification",
      },
    ],
    about: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const University = mongoose.model("University", universitySchema);

export default University;
