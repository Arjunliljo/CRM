import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Country must have a name"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Country must have a code"],
      unique: true,
    },
    flag: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;
