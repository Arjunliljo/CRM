import ActivityLog from "./ActivityLog";
import EligiableCourses from "./EligiableCourses";
import PersonalDetails from "./PersonalDetails";
import ProfileCardStatus from "./ProfileCardStatus";

export default function ProfileCard() {
  return (
    <div className="profileCard">
      <div className="profileCard-head">
        <div className="profileCard-head-info"></div>
      </div>
      <div className="profileCard-journy"></div>
      <div className="profileCard-boxes">
        <PersonalDetails />
        <ProfileCardStatus />
      </div>
      <EligiableCourses />
      <ActivityLog />
    </div>
  );
}
