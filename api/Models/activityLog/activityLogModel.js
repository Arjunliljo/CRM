import mongoose from "mongoose";

const activityLogSchema = mongoose.Schema(
  {
    leadID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      unique: true,
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
          remark: {
            type: String,
            default: "",
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
