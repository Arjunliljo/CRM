import DocumentUpload from "../../smallComponents/DocumentUpload";
import Tracker from "../../smallComponents/Tracker";
import ActivityLog from "./ActivityLog";
import EligiableCourses from "./EligiableCourses";
import PersonalDetails from "./PersonalDetails";
import ProfileCardStatus from "./ProfileCardStatus";

export default function ProfileCard({ IDocumentUpload, lead }) {
  console.log(lead, "lead");

  return (
    <div className="profileCard">
      <div className="profileCard-head">
        <div className="profileCard-head-info">
          <div className="profileCard-head-info-details">
            <div className="profileCard-image-container">
              <img src={lead.img} alt={lead.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>{lead.name}</div>
              <div className="profileCard-head-info-location-card">
                <span className="profileCard-head-info-location">
                  {lead.country}
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
      {IDocumentUpload}
      <EligiableCourses />
      <ActivityLog />
    </div>
  );
}
