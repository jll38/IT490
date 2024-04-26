import { Navigate } from "react-router-dom";
import { User } from "./lib/token";
export function RouteGuard({ children }) {
  console.log("User:");
  console.log(User);
  console.log("---------")
  if (!User) {
    // Redirect them to home page or elsewhere if they do not meet the condition
    return <Navigate to="/" replace />;
  }

  return children;
}
