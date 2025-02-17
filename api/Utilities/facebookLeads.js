import axios from "axios";
import https from "https";
const agent = new https.Agent({
  rejectUnauthorized: false, // Allows self-signed certificates
});

// Function to get Ad Account IDs linked to the app
async function fetchAdAccounts(accessToken) {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v14.0/me/adaccounts?access_token=${accessToken}`,
      { httpsAgent: agent }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching ad accounts:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Function to fetch campaigns for a given Ad Account
async function fetchCampaigns(adAccountId, accessToken, type = "active") {
  // to remove 'act_'
  const formattedAccountId = adAccountId.replace("act_", "");

  try {
    const response = await axios.get(
      `https://graph.facebook.com/v21.0/act_${formattedAccountId}/campaigns?fields=id,name,status,ads{leadgen_form_id}&access_token=${accessToken}`,
      { httpsAgent: agent }
    );

    return response?.data?.data;
  } catch (error) {
    console.error(
      "Error fetching campaigns:",
      error.response?.data || error.message
    );
    throw error;
  }
}

// Function to fetch lead forms for a given campaign
async function fetchLeadForms(campaignId, accessToken) {
  const response = await axios.get(
    `https://graph.facebook.com/v14.0/${campaignId}/adsets?fields=id,name,leadgen_forms&access_token=${accessToken}`,
    { httpsAgent: agent }
  );
  return response.data.data;
}

// Function to fetch lead data for a specific lead form
async function fetchLeads(formId, accessToken) {
  const response = await axios.get(
    `https://graph.facebook.com/v21.0/${formId}/leads?access_token=${accessToken}`,
    { httpsAgent: agent }
  );

  return response.data.data;
}

// Function to save the lead data into the database
async function saveLeadData(lead, campaignName, LeadModel) {
  const leadData = {
    leadId: lead.id,
    leadSource: "META",
    metaData: new Map(
      Object.entries(
        lead.field_data.reduce((acc, field) => {
          acc[field.name] = field.values[0];
          return acc;
        }, {})
      )
    ),
    name:
      lead.field_data.find((field) => field.name === "full_name")?.values[0] ||
      "N/A",
    email:
      lead.field_data.find((field) => field.name === "email")?.values[0] ||
      "N/A",
    phone:
      lead.field_data.find((field) => field.name === "phone_number")
        ?.values[0] || "N/A",
    campaign: campaignName,
  };

  // Save to MongoDB using the provided LeadModel (dynamically based on DB connection)
  const newLead = new LeadModel(leadData);
  await newLead.save();
}
export {
  fetchAdAccounts,
  fetchCampaigns,
  fetchLeadForms,
  fetchLeads,
  saveLeadData,
};
