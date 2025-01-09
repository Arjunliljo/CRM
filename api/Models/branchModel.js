import mongoose from "mongoose";

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch must have a name"],
    },
    description: {
      type: String,
      maxlength: [200, "Description should not exceed 200 characters"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;
