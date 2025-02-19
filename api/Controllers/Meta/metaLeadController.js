/* global process */
import {
  fetchAdAccounts,
  fetchCampaigns,
  fetchLeadForms,
  fetchLeads,
} from "../../Utilities/facebookLeads.js";
import catchAsync from "../../Utilities/catchAsync.js";
import Campaign from "../../Models/campaignModel.js";
import MetaAccount from "../../Models/metaAccountModel.js";
import { convertLeads, saveLeads } from "./saveLeads.js";

const adAccountId = "277770749000629";

// Controller function to handle lead fetching and saving
const getMetaLeads = catchAsync(async (req, res) => {
  const [metaAccount] = await MetaAccount.find();

  const accessToken = metaAccount.longLivedAccessToken;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  // Fetch campaigns for each ad account
  const campaigns = await fetchCampaigns(adAccountId, accessToken);
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === "ACTIVE"
  );

  const leads = await convertLeads(campaigns, accessToken);
  await saveLeads(leads);

  res.status(200).json({
    leads,
    status: "Success",
    message: "Leads fetched and saved successfully",
  });
});

const getCampaigns = catchAsync(async (req, res) => {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  const campaigns = await fetchCampaigns(adAccountId, accessToken);

  const forms = campaigns.map((campaign) => campaign.ads.data?.[0]?.id);

  // Use Promise.all to wait for all fetchLeads promises to resolve
  const leads = await Promise.all(
    forms.map((form) => fetchLeads(form, accessToken))
  );

  res.status(200).json({
    campaigns,
    forms,
    leads,
    result: campaigns.length,
    message: "Campaigns fetched successfully",
  });
});

const getForms = catchAsync(async (req, res) => {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  const campaignId = "6654861567950";

  const adSets = await fetchLeadForms(campaignId, accessToken);

  res.status(200).json({
    forms: adSets,
    message: "Campaigns fetched successfully",
  });
});

const updateCampaigns = catchAsync(async (req, res) => {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    return res.status(400).json({ error: "Access token is required" });
  }

  // Fetch all ad accounts linked to the app
  const adAccounts = await fetchAdAccounts(accessToken);

  if (!adAccounts || adAccounts.length === 0) {
    return res.status(404).json({ error: "No ad accounts found" });
  }

  for (const adAccount of adAccounts) {
    const adAccountId = adAccount.account_id || adAccount.id;

    // Fetch campaigns for each ad account
    const campaigns = await fetchCampaigns(adAccountId, accessToken);

    // Prepare new campaigns for insertion
    const newCampaigns = campaigns.map((campaign) => ({
      campaignId: campaign.id,
      name: campaign.name,
      status: campaign.status,
    }));

    // Insert only new campaigns that do not exist already
    await Campaign.insertMany(newCampaigns, { ordered: false }).catch(
      (error) => {
        if (error.code !== 11000) throw error; // Ignore duplicate key errors, rethrow others
      }
    );
  }

  res.status(201).json({
    success: true,
    message: "New campaigns fetched and added successfully",
  });
});
export { getMetaLeads, updateCampaigns, getCampaigns, getForms };
