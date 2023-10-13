import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  if (currentUser.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  } else {
    return children || <Outlet />;
  }
}
