export default function Error() {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Oops! Page Not Found</h2>
        <p className="error-text">
          The page you&apos;re looking for doesn&apos;t seem to exist.
        </p>
        <a href="/" className="error-button">
          Back to Home
        </a>
      </div>
    </div>
  );
}
