import mongoose from "mongoose";

const activityLogSchema = mongoose.Schema(
  {
    leadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
    },
    statusChange: {
      type: [
        {
          statusID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
          },
          updated: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);

export default ActivityLog;
