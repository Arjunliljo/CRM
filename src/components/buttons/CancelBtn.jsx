function CancelBtn({ children, onClick, type = "button" }) {
  return (
    <button className="btn-cancel" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default CancelBtn;
