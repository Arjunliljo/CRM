import Lead from "../../Models/leadsModel.js";
import { fetchLeads } from "../../Utilities/facebookLeads.js";
import { formatLeads } from "./leadsFormatter.js";

export const convertLeads = async (campaigns, accessToken) => {
  return await campaigns.reduce(async (promise, campaign) => {
    const acc = await promise;

    const formId = campaign.ads.data?.[0]?.id;
    if (!formId) return acc;

    const campaignLeads = await fetchLeads(formId, accessToken);

    if (campaignLeads.length === 0) return acc;

    return [...acc, formatLeads(campaignLeads, campaign)];
  }, Promise.resolve([]));
};

export const saveLeads = async (leads) => {
  const newLeads = [];
  for (const lead of leads.flat()) {
    try {
      const insertedLead = await Lead.create(lead);
      newLeads.push(insertedLead);
    } catch (error) {
      // Skip duplicate phone number errors (11000 is MongoDB duplicate key error code)
      if (error.code !== 11000) {
        throw error; // Re-throw other types of errors
      }
      // Optionally log skipped duplicates
      console.log(`Skipped duplicate lead with phone: ${lead.phone}`);
    }
  }
};
