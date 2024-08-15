import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary component that catches and displays errors.
 */

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  handleClearData() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops! An error occurred.</h1>
          <p>
            To fix it, try clearing your local files (cookies and cache) and then refresh the page.
          </p>
          <div>{this.state.error?.message}</div>
          <button onClick={() => location.reload()}>Refresh Page</button>
          <button onClick={this.handleClearData}>Clear Data</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
