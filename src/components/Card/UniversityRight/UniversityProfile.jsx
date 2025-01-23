import PrimaryBttn from "../../buttons/PrimaryBttn";
import HomeIcon from "../../utils/Icons/HomeIcon";
import ActivityLog from "../ProfileCard/ActivityLog";
import EligiableCourses from "../ProfileCard/EligiableCourses";
import PersonalDetails from "../ProfileCard/PersonalDetails";
import ProfileCardStatus from "../ProfileCard/ProfileCardStatus";
import UniversityEligible from "../ProfileCard/UniversityEligible";
import Requirements from "./Requirements";

function UniversityProfile() {
  const lead = {
    img: "https://via.placeholder.com/100",
    name: "College De Paris",
    title: "Student at XYZ Academy",
    location: "France",
    year: "2",
  };
  return (
    <div className="UniversityRightCard">
      <div className="UniversityRightCard-head">
        <div className="UniversityRightCard-head-info">
          <div className="UniversityRightCard-head-info-details">
            <div>
              <img src={lead.img} alt={lead.name} />
            </div>
            <div className="name-bar-name name-small">
              <div>
                {lead.name}
                <br></br>
                <p style={{ fontSize: "1rem", color: "gray" }}>
                  {lead.location}
                </p>
              </div>
              <div className="UniversityRightCard-head-info-location-card">
                <span className="UniversityRightCard-head-info-location"></span>
              </div>
              <div className="cardUniversity-body-bottom-icons-item">
                <HomeIcon path="stayback" color="#00b100" />
                <p>
                  <span style={{ fontSize: "0.8rem", color: "gray" }}>
                    Stayback:{" "}
                  </span>
                  <span style={({ color: "black" }, { fontSize: "0.8rem" })}>
                    {lead.year} Years
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="UniversityRightCard-head-info-right-card">
            <PrimaryBttn
              style={{
                paddingLeft: "2.5rem",
                paddingRight: "2.5rem",
                marginBottom: "4rem",
              }}
            >
              Edit
            </PrimaryBttn>
          </div>
        </div>
      </div>
      <div>
        <Requirements />
      </div>
      {/* <div className="profileCard-boxes">
        <PersonalDetails />
        <ProfileCardStatus />
      </div> */}
      <UniversityEligible />
      {/* <ActivityLog /> */}
    </div>
  );
}

export default UniversityProfile;
