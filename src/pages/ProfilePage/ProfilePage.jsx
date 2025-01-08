import LeftRound from "./LeftRound";
import ProfileRight from "./ProfileRight";

function Profilepage() {
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

export default Profilepage;
