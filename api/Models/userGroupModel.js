import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Group must have a name"],
      maxlength: [50, "Group name should be less than 50 characters"],
      minlength: [3, "Group name should be greater than 3 characters"],
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description should be less than 200 characters"],
      minlength: [5, "Description should be greater than 5 characters"],
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: [true, "Group must be associated with a branch"],
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // The user who created the group
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Dynamically get the Group model for the specified database connection
const getGroupModel = (dbConnection) => {
  return dbConnection.model("Group", groupSchema);
};

export default getGroupModel;
