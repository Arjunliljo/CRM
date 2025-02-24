import Lead from "../../Models/leadsModel.js";
import catchAsync from "../../Utilities/catchAsync.js";
import { manualLeadsToBranch } from "../batch/manualLeadToBranch.js";

export const leadsToBranch = catchAsync(async (req, res, next) => {
  await manualLeadsToBranch();

  const leads = await Lead.find({ branch: { $exists: false } });

  res.status(200).json({
    message: "Successs",
    leads,
    // result: unassignedLeads.length,
  });
});
