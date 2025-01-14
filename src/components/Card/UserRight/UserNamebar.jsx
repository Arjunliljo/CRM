function UserNamebar({ user }) {
  return (
    <div className="name-bar">
      <div className="name-bar-img">
        <img src={user.img} alt={user.name} />
      </div>
      <div className="name-bar-name name-small">
        <div>{user.name}</div>
        <div className="name-bar-name-whatsapp">
          <span className="card-number">{user.role}</span>
        </div>
      </div>
    </div>
  );
}

export default UserNamebar;
