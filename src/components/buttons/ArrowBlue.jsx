export default function ArrowBlue({ children, onClick, style }) {
  return (
    <button
      className="btn circle-btn circle-blue"
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
