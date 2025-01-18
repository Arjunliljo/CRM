import TagWishCard from "../../components/Card/Dashboard/TagWishCard";
import MyWork from "../../components/Card/Dashboard/Work/MyWork";
import LeadsCard from "../../components/Card/Dashboard/LeadCard/LeadsCard";
import Overview from "../../components/Card/Dashboard/Overview";
import Leaderboard from "../../components/Card/Dashboard/LeaderBoard/Leaderboard";
import Messages from "../../components/Card/Dashboard/Messages/Messages";
import Performance from "../../components/Card/Dashboard/PerpormanceCard/Performance";
import EnrollmentCard from "../../components/Card/Dashboard/EnrollmentCard/EnrollmentCard";
import CustomBody from "../../layout/MainBody/CustomBody";
import { Padding } from "@mui/icons-material";

export default function Dashboard() {
  const ITagWishCard = <TagWishCard />;

  return (
    <>
      <TagWishCard />
      <div key="dashboard-grid" className="dashboard-grid">
        <div className="first-column">
          <MyWork />
        </div>
        <div className="second-column">
          <LeadsCard />
          <Overview />
        </div>
        <div className="third-column">
          <EnrollmentCard />
          <Performance />
        </div>
        <div className="fourth-column">
          <Leaderboard />
          <Messages />
        </div>
      </div>
    </>
  );
}
