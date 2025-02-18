import mongoose from "mongoose";

const generalSchema = mongoose.Schema(
  {
    autoAssignLeadsToBranch: {
      type: Boolean,
      default: false,
    },
    autoAssignLeadsToUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const General = mongoose.model("General", generalSchema);
export default General;
