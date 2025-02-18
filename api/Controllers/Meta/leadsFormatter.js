export const formatLeads = (leads, campaign) => {
  const formattedLeads = leads.map((lead) => {
    return {
      name:
        lead.field_data.find(
          (field) => field.name === "full_name" || field.name === "name"
        )?.values[0] || "N/A",
      email:
        lead.field_data.find((field) => field.name === "email")?.values?.[0] ||
        "N/A",
      phone:
        lead.field_data.find((field) => field.name === "phone_number")
          ?.values?.[0] || "N/A",

      campaignName: campaign.name,
      campaignId: campaign.id,
      campaignStatus: campaign.status,
      leadSource: "META",

      country:
        lead.field_data.find((field) => field.name === "country")
          ?.values?.[0] || "N/A",

      city:
        lead.field_data.find((field) => field.name === "city")?.values?.[0] ||
        "N/A",
      state:
        lead.field_data.find((field) => field.name === "state")?.values?.[0] ||
        "N/A",
      // currentCity:
      //   lead.field_data.find((field) => field.name === "city") || "N/A",
    };
  });

  return formattedLeads;
};
