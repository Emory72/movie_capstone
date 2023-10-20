import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  if (currentUser.maLoaiNguoiDung === "QuanTri") {
    return children || <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};
export default AdminProtectedRoute;
