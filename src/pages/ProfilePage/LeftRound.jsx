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
        +
      </label>
    </div>
  );
}

export default LeftRound;
