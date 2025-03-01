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

universitySchema.pre(/^find/, async function (next) {
  this.populate({
    path: "country",
    select: "name",
  });
  this.populate({
    path: "courses",
    select: "name",
  });
  this.populate({
    path: "qualifications",
    select: "name",
  });
  next();
});

const University = mongoose.model("University", universitySchema);

export default University;
