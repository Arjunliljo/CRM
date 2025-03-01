function UserNamebar({ user }) {
  console.log("User in UserNamebar:", user); // Debugging
  return (
    <div className="name-bar">
      <div className="name-bar-img" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '3.5rem',  // Add fixed width
        height: '3.5rem'  // Add fixed height
      }}>
        <img
          src={user?.image}
          alt={user?.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'  // Makes the image circular
          }}
        />
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