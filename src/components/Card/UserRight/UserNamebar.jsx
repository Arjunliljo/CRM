function UserNamebar({ user }) {
  console.log("User in UserNamebar:", user); // Debugging
  return (
    <div className="name-bar">
      <div className="name-bar-img">
        <img src={user?.image} alt={user?.name} />
      </div>
      <div className="name-bar-name name-small">
        <div>{user?.name}</div>
        <div className="name-bar-name-whatsapp">
          <span className="card-number">{user?.role?.name}</span>
        </div>
      </div>
    </div>
  );
}

export default UserNamebar;