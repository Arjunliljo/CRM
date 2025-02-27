function EligibleBttn({ children, onClick }) {
  return (
    <button className="eligible-head-btn" onClick={onClick}>
      {children}
    </button>
  );
}

export default EligibleBttn;
