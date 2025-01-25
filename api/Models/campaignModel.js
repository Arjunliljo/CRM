import mongoose from "mongoose";

const campaignSchema = mongoose.Schema(
  {
    campaignId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Campaign = mongoose.model("Campaign", campaignSchema);

export default Campaign;
