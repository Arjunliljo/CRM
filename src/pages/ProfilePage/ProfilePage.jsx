import LeftRound from "./LeftRound";
import ProfileRight from "./ProfileRight";

function ProfileForm() {
  return (
    <div className="profile-page">
      <LeftRound />
      <div className="profile-page__content">
        <ProfileRight />
        <ProfileRight />
      </div>
    </div>
  );
}

export default ProfileForm;
