import HomeIcon from "../../components/utils/Icons/HomeIcon";

function LeftRound() {
  return (
    <div className="profile-page__icon">
      <input
        type="file"
        className="profile-page__icon-input"
        id="profile-image"
        accept="image/*"
        style={{ display: "none" }}
      />
      <label htmlFor="profile-image" className="profile-page__icon-camera">
        <HomeIcon path="camera" color="#ffffff" />
      </label>
    </div>
  );
}

export default LeftRound;
