import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}

export default Layout;