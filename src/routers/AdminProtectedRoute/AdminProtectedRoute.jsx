import React, { useEffect } from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import {
  Route,
  Redirect,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { userRoles } from "../../apis/userAPI";
import { useQuery } from "@tanstack/react-query";

const AdminProtectedRoute = ({ children }) => {
  const { currentUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();
  function presentPage() {
    navigate(-1);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["userRoles"],
    queryFn: userRoles,
  });
  const roleID = data?.map((role) => role.maLoaiNguoiDung);

  useEffect(() => {
    if (currentUser && roleID !== "QuanTri") {
      presentPage();
    }
  }, [currentUser && roleID !== "QuanTri"]);

  if (!currentUser) {
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  if (roleID === "QuanTri") {
    return children || <Outlet />;
  } else if (roleID !== "QuanTri") {
    presentPage();
  }
};

export default AdminProtectedRoute;
