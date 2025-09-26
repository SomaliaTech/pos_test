import { Navigate } from "react-router-dom";
import useUserStore from "../lib/userStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  if (!user || user.role == "") {
    // redirect to welcome page with id if available
    return <Navigate to="/welcome/guest" replace />;
  }

  if (user.role === "admin" || user.role === "cashier") {
    // Access granted → show children
    return <>{children}</>;
  }

  // fallback → redirect unauthorized roles
  return <Navigate to={`/welcome/guest`} replace />;
};

export default ProtectedRoute;
