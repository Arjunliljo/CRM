import AutoBtn from "../../components/buttons/AutoBtn";
import LeadCard from "../../components/Card/LeadCard";
import SearchBar from "../../components/smallComponents/SearchBar";
import { useSelector } from "react-redux";
import MainBody from "../../layout/MainBody/MainBody";
import Selector from "../../components/Selectors/Selector";
import PrimaryBttn from "../../components/buttons/PrimaryBttn";
import AllLeads from "../../components/buttons/AllLeads";
import { setAutoLeadsAssign, setCurLead } from "../../../global/leadsSlice";
import ProfileCard from "../../components/Card/ProfileCard/ProfileCard";
import StartApplication from "../../components/Card/ProfileCard/StartApplication";
import TagWishCard from "../../components/Card/Dashboard.jsx/TagWishCard";
import MyWork from "../../components/Card/Dashboard.jsx/MyWork";
import LeadsCard from "../../components/Card/Dashboard.jsx/LeadsCard";
import Overview from "../../components/Card/Dashboard.jsx/Overview";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

const lead = {
  num: 3,
  name: "John Doe",
  img: "https://via.placeholder.com/150",
  number: 1234567890,
  status: "Interested",
  statusColor: "red",
  remark:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  applications: 2,
  attempts: 1,
  country: "Germany",
  count: 3,
};
const arr = [...Array(500)].map((_, i) => {
  const obj = { ...lead, _id: i };
  return obj;
});

export default function Dashboard() {
  const { autoLeadsAssign, curLead } = useSelector((state) => state.leads);

  const ITagWishCard = <TagWishCard />
  const IMyWork = <MyWork />
  const ILeadsCard = <LeadsCard />
  const IOverview = <Overview />
  const ILeaderboard = <Leaderboard />
  const IContents = [
    <div key="workLead-wrapper" className="workLead-wrapper">
      {/* <div key="my-work">{IMyWork}</div> */}
      {/* <div key="leads-card">{ILeadsCard}</div> */}
      {/* <div key="overview">{IOverview}</div> */}
      <div key="leaderboard">{ILeaderboard}</div>

    </div>
  ];

  const IProfileCard = <ProfileCard />;
  const IStartApplication = <StartApplication />;

  const TopLeft = [
    <div key="search-bar">{ITagWishCard}</div>,
  ];


  return (
    <MainBody
      TopLeft={TopLeft}
      IContents={IContents}
      switching={autoLeadsAssign}
      ProfileCard={IProfileCard}
      StartApplication={IStartApplication}
    />
  );
}
