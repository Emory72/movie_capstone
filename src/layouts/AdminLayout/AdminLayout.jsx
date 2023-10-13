import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <h1>AdminLayout</h1>
      <div className="row">
        <div className="col-md-3">{/* <Sidebar/> */}</div>
        <div className="col-md-9">
          {/* Những router con dc hiển thị khi sử dụng outlet */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
