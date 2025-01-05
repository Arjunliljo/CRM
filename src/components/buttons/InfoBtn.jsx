export default function InfoBtn({ color, bgcl, children = "InfoBtn" }) {
  return (
    <div
      className="btn info-btn"
      style={{ backgroundColor: bgcl, color: color }}
    >
      {children}
    </div>
  );
}
