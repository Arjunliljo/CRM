import Lead from "../Models/leadsModel.js";
import Branch from "../Models/branchModel.js";

export const leadsToBranchAutoAssigner = async () => {
  //find all leads which don't have the branch
  const leads = await Lead.find({ branch: { $exists: false } });

  //find all branches
  const branches = await Branch.find({});

  // If no leads or branches, return early
  if (leads.length === 0 || branches.length === 0) return;

  // Distribute leads equally among branches
  const updates = leads.map((lead, index) => {
    const branchIndex = index % branches.length;
    return Lead.findByIdAndUpdate(
      lead._id,
      { branch: branches[branchIndex]._id },
      { new: true }
    );
  });

  // Execute all updates
  await Promise.all(updates);
};
