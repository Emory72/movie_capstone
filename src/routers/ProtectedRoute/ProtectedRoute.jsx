import React from "react";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// Mục đích: kiểm tra user đã đăng nhập và phòng tránh ng ngoài biết dc url và nhập chính xác vào => đẩy user về trang đăng nhập

export default function ProtectedRoute({ children }) {
  const { currentUser } = useUserContext();
  const location = useLocation();

  if (!currentUser) {
    //User chưa đăng nhập => redirect về trang login
    //Nếu đã đăng nhập thì trả về page mà trước đó user đang đứng (VD: đang ở trang ticket thì phải login )
    const url = `/sign-in?redirectTo=${location.pathname}`;
    return <Navigate to={url} replace />;
  }

  return children || Outlet;
}
// TH1:
{
  /* <Route
  path="..."
  element={
    <ProtectedRoute>
      <Component />
    </ProtectedRoute>
  }
/>; */
}

// //TH2: Phải sử dụng kèm Outlet import from react-router-dom, lợi ích: có thể đưa nhiều route cần bảo vệ vào
//Thêm vào bên App.js
{
  /* <Route element={<ProtectedRoute />}>
  <Route path="..." element={<div>Ticket Page</div>} />
  <Route path="abc" element={<div>Ticket Page</div>} />
  <Route path="xyz" element={<div>Ticket Page</div>} />
</Route>; */
}
