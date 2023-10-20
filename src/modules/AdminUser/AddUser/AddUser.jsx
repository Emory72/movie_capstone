import React, { useState } from "react";
import { addUser } from "../../../apis/userAPI";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

export default function AddUser() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung: "",
      maNhom: "GP13",
    },
    mode: "onTouched",
  });

  const { mutate: handleAddUser } = useMutation({
    mutationFn: (values) => {
      return addUser(values);
    },
    onSuccess: () => {
      setSuccessMessage("The operation was successful");
      reset();

      // Sử dụng queryClient.invalidateQuerries để gọi lại API get danh sách phim
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = (values) => {
    handleAddUser(values);
  };

  return (
    <div className="px-5 text-white">
      <h1 className="text-white mt-5 py-5">Thêm User</h1>
      {successMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {successMessage}
          </Alert>
        </Stack>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-primary rounded-4 px-5 py-5 border-3 bg-white text-dark"
      >
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Tài Khoản</label>
          <input
            className="form-control w-50"
            placeholder="Tên tài khoản"
            {...register("taiKhoan", {
              required: {
                value: true,
                message: "Tài khoản không được để trống",
              },
            })}
          />
          {errors.taiKhoan && (
            <p className="text-danger">{errors.taiKhoan.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Họ và Tên</label>
          <input
            placeholder="Họ và tên "
            className="form-control w-50"
            {...register("hoTen", {
              required: {
                value: true,
                message: "Họ tên không được để trống",
              },
            })}
          />

          {errors.hoTen && (
            <p className="text-danger">{errors.hoTen.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            placeholder="Email"
            autoComplete="current-password"
            className="form-control w-50"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email không được để trống",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Email không đúng định dạng",
              },
            })}
          />

          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Số Điện Thoại</label>
          <input
            placeholder="Số điện thoại"
            className="form-control w-50"
            type="number"
            {...register("soDt", {
              required: {
                value: true,
                message: "Số điện thoại không được để trống",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Không đúng định dạng số",
              },

              maxLength: 11,
            })}
          />

          {errors.soDt && <p className="text-danger">{errors.soDt.message}</p>}
          {errors.soDt?.type === "maxLength" && (
            <p className="text-danger">nhiều nhất 11 kí tự</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Mật Khẩu</label>
          <input
            placeholder="Mật Khẩu"
            autoComplete="current-password"
            className="form-control w-50"
            type="password"
            {...register("matKhau", {
              required: {
                value: true,
                message: "Mật khẩu không được để trống",
              },
            })}
          />

          {errors.matKhau && (
            <p className="text-danger">{errors.matKhau.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Mã loại người dùng</label>
          <select
            name="maLoaiNguoiDung"
            placeholder="Mã loại khách hàng"
            className="form-control w-50"
            {...register("maLoaiNguoiDung")}
          >
            <option value="">Mã loại người dùng</option>
            <option value="KhachHang">Khách Hàng</option>
            <option value="QuanTri">Quản Trị</option>
          </select>
        </div>
        {errors.maLoaiNguoiDung && (
          <p className="text-danger">{errors.maLoaiNguoiDung.message}</p>
        )}
        <button type="submit" className="btn btn-primary fw-bold py-2 mt-2">
          Thêm User
        </button>
      </form>
    </div>
  );
}
