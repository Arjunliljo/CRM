import PrimaryBttn from "../../components/buttons/PrimaryBttn";

function ProfileRight({ user, onInputChange, handleSubmit }) {
  return (
    <>
      <div className="profile-page__column">
        <input
          type="text"
          name="name"
          className="profile-page__input"
          placeholder="Name"
          value={user.name}
          onChange={onInputChange}
        />

        <input
          type="tel"
          name="phone"
          className="profile-page__input"
          placeholder="Phone"
          value={user.phone}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="addressOne"
          className="profile-page__input"
          placeholder="Address One"
          value={user.addressOne}
          onChange={onInputChange}
        />
        <input
          type="text"
          name="addressTwo"
          className="profile-page__input"
          placeholder="Address Two"
          value={user.addressTwo}
          onChange={onInputChange}
        />

        <PrimaryBttn onClick={handleSubmit} style={{ width: "10%" }}>Update</PrimaryBttn>
      </div>
      {/* <div className="profile-page__button">
        <PrimaryBttn text="Update" />
      </div> */}
    </>
  );
}

export default ProfileRight;
