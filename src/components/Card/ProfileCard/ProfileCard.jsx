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
              {lead?.users?.map((val) => {
                const role = getRoleName(val?.role, roles);
                return (
                  <>{role ? <span>{role}</span> : <span>Not Assigned</span>}</>
                );
              })}
            </div>
            <div className="profileCard-head-info-assigners">
              {lead?.users?.map((val) => {
                return <span key={val._id}>{val.name}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="profileCard-journy">
        {lead?.isStudent ? <Tracker completedStep={3} /> : null}
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
