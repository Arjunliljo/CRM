import HomeIcon from "../../components/utils/Icons/HomeIcon";

function LeftRound({ userImage, onImageChange }) {
  return (
    <div className="profile-page__icon">
      <img
        src={userImage}
        alt="User Profile"
        className="profile-page__icon-image"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover"
        }}
      />
      <input
        type="file"
        className="profile-page__icon-input"
        id="profile-image"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onImageChange}
      />
      <label htmlFor="profile-image" className="profile-page__icon-camera">
        <HomeIcon path="camera" color="#ffffff" />
      </label>
    </div>
  );
}

export default LeftRound;
