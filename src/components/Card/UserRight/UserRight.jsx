import { useSelector } from "react-redux";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import HomeIcon from "../../utils/Icons/HomeIcon";
import ActivityLog from "../ProfileCard/ActivityLog";
import EligiableCourses from "../ProfileCard/EligiableCourses";
import PersonalDetails from "../ProfileCard/PersonalDetails";
import ProfileCardStatus from "../ProfileCard/ProfileCardStatus";
import UniversityEligible from "../ProfileCard/UniversityEligible";
import UserPersonalEdit from "./UserPersonalEdit";
import UserPosition from "./UserPosition";

function UserRight({ user }) {
  const lead = {
    img: "https://via.placeholder.com/100",
    name: "College De Paris",
    title: "Student at XYZ Academy",
    location: "France",
    year: "2",
  };
  const currUser = useSelector((state)=> state.currUser)
  console.log(currUser);

  return (
    <div className="UserRightCard">
      <div className="UserRightCard-head-info-details">
        <div>
          <img
            src={user && user?.image}
            alt={user && user?.name}
            style={{ width: "50px", height: "50px" }}
          />
        </div>
        <div className="name-bar-name name-small">
          <div>
            {user && user?.name}
            <br></br>
            <p style={{ fontSize: "1rem", color: "gray" }}>{user && user?.addressOne}</p>
          </div>
          <div className="UserRightCard-head-info-location-card">
            <span className="UserRightCard-head-info-location"></span>
          </div>

          {/* <div className="UserRightCard-body-bottom-icons-item">
            <HomeIcon
              path="u-turn"
              color="#00b100"
              style={{ transform: "rotate(270deg)" }}
            />
            <p>
              <span style={{ fontSize: "0.8rem", color: "gray" }}>
                Stayback:{" "}
              </span>
              <span style={({ color: "black" }, { fontSize: "0.8rem" })}>
                {lead.year} Years
              </span>
            </p>
          </div> */}
        </div>
      </div>
      <div className="UserRightCard-boxes">
        <UserPersonalEdit user={user} />
        <UserPosition user={user} />
      </div>
    </div>
  );
}

export default UserRight;
