import { useState } from "react";
import AutoBtn from "../../components/buttons/AutoBtn";
import SearchBar from "../../components/smallComponents/SearchBar";
import LeadCard from "../../components/Card/LeadCard";

export default function Leads() {
  const [isLeads, setIsLeads] = useState(true);
  return (
    <main className="main-body leads">
      <div className="main-body-head">
        <div className="main-body-head-left">
          <div className="main-body-head-left-top">
            <SearchBar />
            <AutoBtn>Auto Assign</AutoBtn>
          </div>
          <div className="main-body-head-left-bottom">
            <button onClick={() => setIsLeads((val) => !val)}>Leads</button>
          </div>
        </div>
      </div>
      <div className="main-body-box">
        <div
          className="main-body-box-left"
          style={isLeads ? { width: "60%" } : { width: "100%" }}
        >
          <div className="main-body-scroll-container">
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
            <LeadCard />
          </div>
        </div>
        <div
          className="main-body-box-right"
          style={isLeads ? { width: "40%" } : { width: "0%" }}
        ></div>
      </div>
    </main>
  );
}
