import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return Object.keys(userInfo).length != 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" />
  );
}
