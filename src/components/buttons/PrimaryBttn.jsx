function PrimaryBttn({ style, children }) {
  return (
    <button style={style} className="btn primary-btn">
      {children}
    </button>
  );
}

export default PrimaryBttn;
