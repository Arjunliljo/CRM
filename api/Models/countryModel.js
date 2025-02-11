import mongoose from "mongoose";

const countrySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Country must have a name"],
      unique: true,
      sparse: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Country = mongoose.model("Country", countrySchema);

export default Country;