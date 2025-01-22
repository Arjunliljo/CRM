
function PrimaryBttn({ style, children, onClick }) {
  return (
    <button style={style} className="btn primary-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryBttn;
