function PrimaryBttn({ style, children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      style={style}
      className="btn primary-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryBttn;
