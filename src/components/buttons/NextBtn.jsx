export default function NextBtn({
  children,
  onClick,
  type = "button",
  isLoading = true,
}) {
  return (
    <button
      className={`loading`}
      type={type}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <span className="loading-indicator"></span> : children}
    </button>
  );
}
