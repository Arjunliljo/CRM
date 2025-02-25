import mongoose from "mongoose";

const acticityLogSchema = mongoose.Schema(
  {
    leadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    statusChange: [
      {
        statusID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lead",
        },
        updatedAt: Date.now(),
      },
    ],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ActivityLog = mongoose.model("ActivityLog", acticityLogSchema);

export default ActivityLog;
