import Tracker from "../../smallComponents/Tracker";
import ActivityLog from "./ActivityLog";
import EligiableCourses from "./EligiableCourses";
import PersonalDetails from "./PersonalDetails";
import ProfileCardStatus from "./ProfileCardStatus";

export default function ProfileCard() {
  //dummy
  const lead = {
    img: "https://via.placeholder.com/100",
    name: "David Wilson",
    title: "Student at XYZ Academy",
    location: "Germany, UK, Canada",
  };
  return (
    <div className="profileCard">
      <div className="profileCard-head">
        <div className="profileCard-head-info">
          <div className="profileCard-head-info-details">
            <div>
              <img src={lead.img} alt={lead.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>{lead.name}</div>
              <div className="profileCard-head-info-location-card">
                <span className="profileCard-head-info-location">
                  {lead.location}
                </span>
                <span className="profileCard-head-info-underline"></span>
              </div>
              <button className="hot-btn">Hot</button>
            </div>
          </div>
          <div className="profileCard-head-info-right-card">
            <div className="card-number profileCard-head-info-keys">
              <span>Counsellor</span>
              <span>SRM</span>
              <span>Application Head</span>
            </div>
            <div className="profileCard-head-info-assigners">
              <span>Aswathi S</span>
              <span>Shruthi Hassan</span>
              <span>Monica</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profileCard-journy">
        <Tracker completedStep={3} />
      </div>
      <div className="profileCard-boxes">
        <PersonalDetails />
        <ProfileCardStatus />
      </div>
      <EligiableCourses />
      <ActivityLog />
    </div>
  );
}
