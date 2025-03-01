import { useEffect } from "react";
import { useApi } from "../../../context/apiContext/ApiContext";
import { getRoleName } from "../../../service/nameFinders";
import Tracker from "../../smallComponents/Tracker";

export default function ProfileCard({
  IDocumentUpload,
  lead,
  IProfileCardStatus,
  IEligiableCourses,
  IActivityLog,
  personalDetails,
  StartOtherApplication,
}) {
  const {
    roleConfigs: { roles },
  } = useApi();

  return (
    <div className="profileCard">
      <div className="profileCard-head">
        <div className="profileCard-head-info">
          <div className="profileCard-head-info-details">
            <div className="profileCard-image-container">
              <img src={lead?.img} alt={lead?.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>{lead?.name}</div>
              <div className="profileCard-head-info-location-card">
                <span className="profileCard-head-info-location">
                  {lead?.country}
                </span>
                <span className="profileCard-head-info-underline"></span>
              </div>
              <button className="hot-btn">Hot</button>
            </div>
          </div>
          <div className="profileCard-head-info-right-card">
            <div className="card-number profileCard-head-info-keys">
              {lead?.users?.length > 0 ? (
                lead?.users?.map((val, index) => {
                  const role = getRoleName(val?.role, roles);
                  return (
                    <span key={`${val._id}-role-${index}`}>
                      {role || "Not Assigned"}
                    </span>
                  );
                })
              ) : (
                <span>Not Assigned</span>
              )}
            </div>
            <div className="profileCard-head-info-assigners">
              {lead?.users?.length > 0 ? (
                lead?.users?.map((val, index) => (
                  <span key={`${val._id}-${index}`}>{val.name}</span>
                ))
              ) : (
                <span>Assign to a user</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="profileCard-journy">
        {lead?.isStudent ? <Tracker completedStep={3} /> : null}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {StartOtherApplication}
      </div>
      <div className="profileCard-boxes">
        {personalDetails}

        {IProfileCardStatus}
      </div>
      {IDocumentUpload}
      {IEligiableCourses}
      {IActivityLog}
    </div>
  );
}
