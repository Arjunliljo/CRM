import PrimaryBttn from "../../buttons/PrimaryBttn";
import HomeIcon from "../../utils/Icons/HomeIcon";
import ActivityLog from "../ProfileCard/ActivityLog";
import EligiableCourses from "../ProfileCard/EligiableCourses";
import PersonalDetails from "../ProfileCard/PersonalDetails";
import ProfileCardStatus from "../ProfileCard/ProfileCardStatus";
import UniversityEligible from "../ProfileCard/UniversityEligible";
import UserPersonalEdit from "./UserPersonalEdit";
import UserPosition from "./UserPosition";

function UserRight() {
  const lead = {
    img: "https://via.placeholder.com/100",
    name: "College De Paris",
    title: "Student at XYZ Academy",
    location: "France",
    year: "2",
  };
  return (
    <div className="UserRightCard">
      <div className="UserRightCard-boxes">
        <UserPersonalEdit />
        <UserPosition />
      </div>
    </div>
  );
}

export default UserRight;
