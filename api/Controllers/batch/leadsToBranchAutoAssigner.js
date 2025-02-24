import General from "../../Models/generalModel.js";
import { manualLeadsToBranch } from "./manualLeadToBranch.js";

export const leadsToBranchAutoAssigner = async () => {
  const gen = await General.find({});

  const { autoAssignLeadsToBranch } = gen[0];

  if (!autoAssignLeadsToBranch) return;

  await manualLeadsToBranch();
};
