import EnrollmentCard from "../../components/Card/Dashboard.jsx/EnrollmentCard";
import Leaderboard from "../../components/Card/Dashboard.jsx/Leaderboard";
import LeadsCard from "../../components/Card/Dashboard.jsx/LeadCard/LeadsCard";
import Messages from "../../components/Card/Dashboard.jsx/Messages";
import MyWork from "../../components/Card/Dashboard.jsx/MyWork";
import Overview from "../../components/Card/Dashboard.jsx/Overview";
import Performance from "../../components/Card/Dashboard.jsx/Performance";

function Dash() {
  return (
    <main className="dashbord-container">
      <div className="dashbord-container-cards">
        <div
          className="dashbord-container-item"
          style={{ backgroundColor: "white" }}
        >
          {/* <MyWork /> */}
        </div>

        <div className="dashbord-container-item">
          <div
            className="dashbord-container-item-firstbox"
            style={{ backgroundColor: "white" }}
          >
            <LeadsCard />
          </div>
          <div
            className="dashbord-container-item-secondbox"
            style={{ backgroundColor: "white" }}
          >
            <Overview />l
          </div>
        </div>
        <div className="dashbord-container-item">
          <div
            className="dashbord-container-item-chartbox"
            style={{ backgroundColor: "white" }}
          >
            {/* <EnrollmentCard /> */}
          </div>
          <div
            className="dashbord-container-item-secondbox"
            style={{ backgroundColor: "white" }}
          >
            {/* <Performance /> */}
          </div>
        </div>
        <div className="dashbord-container-item">
          <div
            className="dashbord-container-item-firstbox"
            style={{ backgroundColor: "white" }}
          >
            {/* <Leaderboard /> */}
          </div>
          <div
            className="dashbord-container-item-secondbox"
            style={{ backgroundColor: "white" }}
          >
            {/* <Messages /> */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dash;
