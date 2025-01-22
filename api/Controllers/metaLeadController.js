/* global process */
import mongoose from "mongoose";
import leadSchema from "../Models/leadsModel.js";
import {
  fetchAdAccounts,
  fetchCampaigns,
  fetchLeadForms,
  fetchLeads,
  saveLeadData,
} from "../Utilities/facebookLeads.js";
import catchAsync from "../Utilities/catchAsync.js";

// Controller function to handle lead fetching and saving
export const getMetaLeads = catchAsync(async (req, res) => {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  // Get all ad accounts linked to the app
  const adAccounts = await fetchAdAccounts(accessToken);

  if (!adAccounts || adAccounts.length === 0) {
    return res.status(404).json({ error: "No ad accounts found" });
  }

  // Store all leads
  const allLeads = [];

  for (const adAccount of adAccounts) {
    const adAccountId = adAccount.account_id || adAccount.id;

    // Fetch campaigns for each ad account
    const campaigns = await fetchCampaigns(adAccountId, accessToken);

    for (const campaign of campaigns) {
      const campaignId = campaign.id;
      const campaignName = campaign.name;

      // Fetch lead forms for each campaign
      const adSets = await fetchLeadForms(campaignId, accessToken);

      for (const adSet of adSets) {
        if (adSet.leadgen_forms) {
          for (const form of adSet.leadgen_forms) {
            const formId = form.id;

            // Fetch leads from the lead form
            const leads = await fetchLeads(formId, accessToken);
            console.log(leads, "leads");

            allLeads.push(...leads);

            // const LeadModel = dbConnection.model("Lead", leadSchema);
            // for (const lead of leads) {
            //   await saveLeadData(lead, campaignName, LeadModel);
            // }
          }
        }
      }
    }
  }

  // Send response with all collected leads
  res.status(200).json({
    data: allLeads,
    message: "Leads fetched and saved successfully",
  });
});
