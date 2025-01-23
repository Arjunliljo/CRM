function CancelBtn({ children, style, onClick, type = "button" }) {
  return (
    <button className="btn-cancel" type={type} onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default CancelBtn;
