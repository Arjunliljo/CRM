import LeadCardHeader from "./LeadCardHeader";
import LeadCardItems from "./LeadCardItems";

export default function LeadsCard() {
  const leadData = [
    {
      count: 31,
      label: "Unattended Leads",
      color: "green",
    },
    {
      count: 24,
      label: "Interested Leads",
      color: "blue",
    },
    {
      count: 18,
      label: "Documents Pending",
      color: "green",
    },
    {
      count: 65,
      label: "New Opportunities",
      color: "blue",
    },
  ];

  return (
    <div className="dashboard-leads">
      <LeadCardHeader />
      <div className="lead-items">
        {leadData.map((item, index) => (
          <LeadCardItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
