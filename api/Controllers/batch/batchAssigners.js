import Lead from "../../Models/leadsModel";

export const assignLeadsToUsers = async (leadIds, user) => {
  leadIds.forEach(async (leadId) => {
    const lead = await Lead.findByIdAndUpdate(leadId, { userId: user._id });
  });
  return leadIds;
};
