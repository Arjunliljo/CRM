import { useState } from "react";
import AutoBtn from "../../components/buttons/AutoBtn";
import PrimryBtn from "../../components/buttons/AllLeads";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import AllLeads from "../../components/buttons/AllLeads";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import Selector from "../../components/Selectors/Selector";
import Status from "../../components/smallComponents/Status";
import Country from "../../components/smallComponents/Country";
import SecondryBtn from "../../components/buttons/SecondryBtn";

export default function Leads() {
  const [isLeads, setIsLeads] = useState(true);
  return (
    <main className="main-body leads">
      <div className="main-body-head">
        <div className="main-body-head-left">
          <div className="main-body-head-left-top">
            <SearchBar />
            <AutoBtn>Auto Assign</AutoBtn>
            {/* <AllLeads>All Leads</AllLeads> */}
            {/* <PrimaryBttn>Add Leads</PrimaryBttn> */}
            {/* <Selector></Selector> */}
            {/* <Status /> */}
            {/* <Country /> */}
            {/* <SecondryBtn /> */}
          </div>
          <div className="main-body-head-left-bottom"></div>
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
