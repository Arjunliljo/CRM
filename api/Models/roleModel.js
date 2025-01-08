import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role must have a name"],
    },
    description: {
      type: String,
      maxlength: [100, "Description should be less than 100 characters"],
      minlength: [3, "Description should be greater than 3 characters"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
