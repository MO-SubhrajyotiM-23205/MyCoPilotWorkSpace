import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error info here or send to a service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    const { textColor = "red" } = this.props;
    if (this.state.hasError) {
      return (
        <div style={{ color: textColor, display: "flex", alignItems: "center", gap: "12px" }}>
          <span role="img" aria-label="error" style={{ fontSize: "2rem" }}>❌</span>
          <div>
            <h2>Something went wrong.</h2>
            <p>{this.state.error && this.state.error.toString()}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
