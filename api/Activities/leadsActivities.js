import mongoose from "mongoose";
import leadSchema from "../Models/leadsModel.js";
import {
  fetchAdAccounts,
  fetchCampaigns,
  fetchLeadForms,
  fetchLeads,
  saveLeadData,
} from "../Utilities/facebookLeads.js";

export async function fetchAndSaveLeads(accessToken) {
  const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const adAccounts = await fetchAdAccounts(accessToken);

  if (!adAccounts || adAccounts.length === 0) {
    console.log("No ad accounts found");
    return;
  }

  for (const adAccount of adAccounts) {
    const adAccountId = adAccount.account_id || adAccount.id;
    const campaigns = await fetchCampaigns(adAccountId, accessToken);

    for (const campaign of campaigns) {
      const campaignId = campaign.id;
      const campaignName = campaign.name;

      const adSets = await fetchLeadForms(campaignId, accessToken);

      for (const adSet of adSets) {
        if (adSet.leadgen_forms) {
          for (const form of adSet.leadgen_forms) {
            const formId = form.id;
            const leads = await fetchLeads(formId, accessToken);

            const LeadModel = dbConnection.model("Lead", leadSchema);
            for (const lead of leads) {
              await saveLeadData(lead, campaignName, LeadModel);
            }
          }
        }
      }
    }
  }

  await dbConnection.disconnect();
}
