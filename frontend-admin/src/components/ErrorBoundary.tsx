// import { Component, type ErrorInfo, type ReactNode } from "react";

// interface Props {
//   children: ReactNode;
// }

// interface State {
//   hasError: boolean;
// }

// class ErrorBoundary extends Component<Props, State> {
//   state: State = {
//     hasError: false,
//   };

//   static getDerivedStateFromError(): State {
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, info: ErrorInfo) {
//     // 🔥 Log error (can send to backend or Sentry later)
//     console.error("UI Error:", error);
//     console.error("Component Stack:", info.componentStack);
//   }

//   render() {
//     if (this.state.hasError) { 
//       return (
//         <div className="container center-align">
//           <h4>Something went wrong 😢</h4>
//           <p>Please refresh the page or contact support.</p>
//         </div>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
