import Campaign from "../../Models/campaignModel.js";
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

export const saveCampaigns = async (campaigns) => {
  try {
    const savedCampaigns = await Promise.all(
      campaigns.map(async (campaign) => {
        const existingCampaign = await Campaign.findOne({
          campaignId: campaign.id,
        });
        if (existingCampaign) {
          console.log(
            `Campaign with ID ${campaign.id} already exists, skipping...`
          );
          return existingCampaign;
        }
        return Campaign.create({
          campaignId: campaign.id,
          name: campaign.name,
          status: campaign.status,
        });
      })
    );
    return savedCampaigns;
  } catch (error) {
    console.error("Error saving campaigns:", error);
    throw error;
  }
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
