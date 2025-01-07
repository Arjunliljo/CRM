import mongoose from "mongoose";
import { classes } from "../serverdata/serverdatas";

const statusSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Status must have a name"],
    },
    class: {
      type: String,
      required: [true, "Status must have a class"],
      enum: classes,
      default: classes[0],
    },
    isRoute: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      maxlength: [100, "Description should be less than 100 characters"],
      minlength: [3, "Description should be greater than 3 characters"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Status = mongoose.model("Status", statusSchema);

export default Status;
