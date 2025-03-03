import React, { useState, useEffect } from "react";


function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);


  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      // Handle errors here
      console.error("Error caught by Error Boundary:", error, errorInfo);
      setHasError(true);
    };

    // Assign the error handler
    window.addEventListener("error", errorHandler);

    // Cleanup function
    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  const handleRedirect = () => {
    window.location.href = "/";
  };

  if (hasError) {
    // Render fallback UI when an error occurs
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Oops! Something went wrong.</h1>
          <p style={styles.message}>
            We apologize for the inconvenience. Please try again later or return
            to the dashboard.
          </p>
          <button style={styles.button} onClick={handleRedirect}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Render children components as usual
  return children;
}

export default ErrorBoundary;

// Styles for the fallback UI
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa", // Light gray background
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff", // White background
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#343a40", // Dark gray text
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    color: "#6c757d", // Gray text
    marginBottom: "30px",
  },
  button: {
    backgroundColor: "#007bff", // Blue button
    color: "#ffffff", // White text
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};