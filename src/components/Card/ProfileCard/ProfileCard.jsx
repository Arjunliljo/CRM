import { useEffect, useState } from "react";
import Tracker from "../../smallComponents/Tracker";
import PersonalDetails from "./PersonalDetails";

export default function ProfileCard({
  IDocumentUpload,
  lead,
  IProfileCardStatus,
  IEligiableCourses,
  IActivityLog,
}) {
  const [isApplication, setIsApplication] = useState(false);

  useEffect(() => {
    setIsApplication(lead?.application?.length > 0);
  }, [lead]);

  return (
    <div className="profileCard">
      <div className="profileCard-head">
        <div className="profileCard-head-info">
          <div className="profileCard-head-info-details">
            <div className="profileCard-image-container">
              <img src={lead && lead.img} alt={lead && lead.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>{lead && lead.name}</div>
              <div className="profileCard-head-info-location-card">
                <span className="profileCard-head-info-location">
                  {lead && lead.country}
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
        {isApplication ? <Tracker completedStep={3} /> : null}
      </div>
      <div className="profileCard-boxes">
        <PersonalDetails />
        {IProfileCardStatus}
      </div>
      {IDocumentUpload}
      {IEligiableCourses}
      {IActivityLog}
    </div>
  );
}
