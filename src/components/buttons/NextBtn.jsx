export default function NextBtn({
  children,
  onClick,
  type = "button",
  isLoading = false,
  style,
}) {
  return (
    <button
      className={`btn-next`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
      style={style}
    >
      {isLoading ? <div className="btn-loader"></div> : children}
    </button>
  );
}
