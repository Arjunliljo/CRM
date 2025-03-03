import UserPersonalEdit from "./UserPersonalEdit";
import UserPosition from "./UserPosition";

function UserRight({ user }) {
  if (!user) {
    throw new Error("User data is missing!");
  }

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
            <p style={{ fontSize: "1rem", color: "gray" }}>
              {user && user?.addressOne}
            </p>
          </div>
          <div className="UserRightCard-head-info-location-card">
            <span className="UserRightCard-head-info-location"></span>
          </div>
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
