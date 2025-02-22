function NormalButton({ children, onClick, style }) {
  return (
    <button className="btn headBttns" onClick={onClick} style={style}>
      {children}
    </button>
  );
}

export default NormalButton;
