import TagWishCard from "../../components/Card/Dashboard.jsx/TagWishCard";
import MyWork from "../../components/Card/Dashboard.jsx/MyWork";
import LeadsCard from "../../components/Card/Dashboard.jsx/LeadsCard";
import Overview from "../../components/Card/Dashboard.jsx/Overview";
import Leaderboard from "../../components/Card/Dashboard.jsx/Leaderboard";
import Messages from "../../components/Card/Dashboard.jsx/Messages";
import Performance from "../../components/Card/Dashboard.jsx/Performance";
import EnrollmentCard from "../../components/Card/Dashboard.jsx/EnrollmentCard";
import CustomBody from "../../layout/MainBody/CustomBody";

export default function Dashboard() {
  const ITagWishCard = <TagWishCard />;

  const IContents = [
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
    </div>,
  ];

  const TopLeft = [<div key="search-bar">{ITagWishCard}</div>];

  return <CustomBody TopLeft={TopLeft} IContents={IContents} />;
}
