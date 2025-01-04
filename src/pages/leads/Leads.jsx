import AutoBtn from "../../components/buttons/AutoBtn";
import PrimryBtn from "../../components/buttons/AllLeads";

import SearchBar from "../../components/smallComponents/SearchBar";
import AllLeads from "../../components/buttons/AllLeads";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import Selector from "../../components/Selectors/Selector";
import Status from "../../components/smallComponents/Status";
import Country from "../../components/smallComponents/Country";
import SecondryBtn from "../../components/buttons/SecondryBtn";

export default function Leads() {
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
      <div className="main-body-box"></div>
    </main>
  );
}
