export default function CountryBtn({
  children,
  style,
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      className="btn countrybtn"
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
