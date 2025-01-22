export default function NextBtn({
  children,
  onClick,
  type = "button",
  isLoading = true,
}) {
  return (
    <button
      className={`btn-next`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <div className="btn-loader"></div> : children}
    </button>
  );
}
