import ActionButtons from "./ActionButtons";
import ProfileBasic from "./ProfileBasic";
import ProfileInfo from "./ProfileInfo";
import ProfileSwitchNav from "./ProfileSwitchNav";

function ProfileUpdateUser() {
  return (
    <div className="profileUpdate-main">
      <ProfileSwitchNav />
      <div className="profile-edit-container">
        <div className="profile-content">
          <ProfileBasic />
          <ProfileInfo />
        </div>
      </div>
      <ActionButtons />
    </div>
  );
}

export default ProfileUpdateUser;
