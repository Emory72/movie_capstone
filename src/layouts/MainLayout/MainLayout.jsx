import React from "react";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function MainLayout() {
  return (
    <div className="">
      <Header />

      {/* Những router con dc hiển thị khi sử dụng outlet */}
      <Outlet />
    </div>
  );
}
