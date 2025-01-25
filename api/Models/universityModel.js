import mongoose from "mongoose";

const universitySchema = mongoose.Schema(
  {
    university: {
      type: String,
      required: [true, "University must have a name"],
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: [true, "Course must have a country"],
    },
    qualification: {
      type: String,
      required: [true, "Qualification must be specified"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const University = mongoose.model("University", universitySchema);

export default University;
