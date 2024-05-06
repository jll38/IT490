import { Navigate } from "react-router-dom";
import { User } from "./lib/token";
export function RouteGuard({ children }) {
console.log("User is authenticated:", User ? true : false);

  if (!User || !User.isLoggedIn) { 
   n
    return <Navigate to="/" replace />;
  }

  return children;
}
