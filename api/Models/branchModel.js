import mongoose from "mongoose";

const branchSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Branch must have a name"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// return the Branch model using the provided database connection
const getBranchModel = (dbConnection) => {
  return dbConnection.model("Branch", branchSchema);
};

export default getBranchModel;
