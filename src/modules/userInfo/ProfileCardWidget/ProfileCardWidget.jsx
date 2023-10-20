import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { userInfoUpdate } from "../../../apis/userAPI";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ProfileCardWidget({ info }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    mode: "onTouched",
  });

  return (
    <div class="card text-right mb-5">
      <div class="card-header myCardHeader">
        <div class="row">
          <div class="col-6">
            <h3 class="text-left text-primary font-weight-bold">
              Thông Tin Người Dùng
            </h3>
          </div>
        </div>
      </div>

      <div class="card-body">
        <form
        // onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Tài Khoản</label>

                <input
                  id="account"
                  disabled
                  className="form-control "
                  type="text"
                  value={info?.taiKhoan}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold fw-bold">Họ và Tên</label>
                <input
                  className="form-control "
                  type="text"
                  value={info?.hoTen}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  className="form-control "
                  type="email"
                  value={info?.email}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-bold">Số Điện Thoại</label>
                <input
                  className="form-control "
                  type="number"
                  value={info?.soDT}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Mật Khẩu</label>
                <input
                  className="form-control "
                  type="text"
                  value={info?.matKhau}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Mã Loại Người Dùng</label>
                <input
                  className="form-control "
                  type="text"
                  value={info?.maLoaiNguoiDung.tenLoai}
                />
              </div>
            </div>
          </div>

          <button
            // onClick={handleUpdate}
            type="submit"
            className="btn btn-primary fw-bold py-2 mt-2"
            id="btnThem"
            data-toggle="modal"
            data-target="#myModal"
          >
            Cập Nhật
          </button>
        </form>
      </div>
    </div>
  );
}
