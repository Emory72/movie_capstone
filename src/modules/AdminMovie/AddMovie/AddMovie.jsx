import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addMovie } from "../../../apis/movieAPI";
import * as dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editMovie } from "../../../apis/movieAPI";

export default function AddMovie() {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const { movieID } = useParams;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      maPhim: movieID,
      tenPhim: "",
      biDanh: "",
      moTa: "",
      trailer: "",
      hinhAnh: null,
      ngayKhoiChieu: "",
      sapChieu: false,
      hot: false,
      danhGia: 0,
    },
    mode: "onTouched",
  });
  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setingPreview] = useState("");

  useEffect(() => {
    //Chạy vào useEffect callback khi giá tri hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setingPreview(evt.target.result);
    };
  }, [hinhAnh]);

  const tenPhimValue = watch("tenPhim");
  const biDanhValue = watch("biDanh");
  const moTaValue = watch("moTa");
  const trailerValue = watch("trailer");
  const ngayKhoiChieuValue = watch("ngayKhoiChieu");
  const hinhAnhValue = watch("hinhAnh");

  const [updatInfo, setUpdateInfo] = useState("");
  const movieInfo = {
    tenPhimValue,
    biDanhValue,
    moTaValue,
    trailerValue,
    ngayKhoiChieuValue,
    hinhAnhValue,
  };

  //Update
  useEffect(() => {
    if (!movieInfo) return;

    setValue("maPhim", movieID);
    setValue("tenPhim", movieInfo.tenPhim);
    setValue("biDanh", movieInfo.biDanh);
    setValue("moTa", movieInfo.moTa);
    setValue("hinhAnh", movieInfo.hinhAnh);
    setValue("trailer", movieInfo.trailer);
    setValue("ngayKhoiChieu", movieInfo.ngayKhoiChieu);

    setUpdateInfo();
  }, []);
  //Add Movie
  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values);

      const formData = new FormData();
      formData.append("maPhim", values.maPhim);
      formData.append("tenPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP13");

      return addMovie(formData);
    },
    onSuccess: () => {
      setSuccessMessage("The operation was successful");
      reset();

      // Sử dụng queryClient.invalidateQuerries để gọi lại API get danh sách phim
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <div className="px-5 text-white">
      <h1 className="text-white mt-5 py-5">Thêm Phim</h1>
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
          <label className="form-label fw-bold fw-bold">Tên Phim</label>
          <input
            className="form-control w-50"
            placeholder="Tên Phim"
            {...register("tenPhim", {
              required: {
                value: true,
                message: "Tên phim không được để trống",
              },
            })}
          />
          {errors.tenPhim && (
            <p className="text-danger">{errors.tenPhim.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Bí Danh</label>
          <input
            className="form-control w-50"
            placeholder="Bí Danh "
            {...register("biDanh", {
              required: {
                value: true,
                message: "Bí danh không được để trống",
              },
            })}
          />
          {errors.biDanh && (
            <p className="text-danger">{errors.biDanh.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Mô Tả</label>
          <input
            className="form-control w-50"
            placeholder="Mô Tả"
            {...register("moTa", {
              required: {
                value: true,
                message: "Mô tả phim không được để trống",
              },
            })}
          />
          {errors.moTa && <p className="text-danger">{errors.moTa.message}</p>}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Hình Ảnh </label>
          <input
            className="form-control w-50"
            type="file"
            placeholder="Hình Ảnh"
            {...register("hinhAnh", {
              required: {
                value: true,
                message: "Hình ảnh không được để trống",
              },
            })}
          />
          {errors.hinhAnh && (
            <p className="text-danger">{errors.hinhAnh.message}</p>
          )}
          {imgPreview && (
            <div className="mb-3">
              <img src={imgPreview} alt="preview" width={200} height={200} />
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Trailer</label>
          <input
            className="form-control w-50"
            placeholder="Trailer"
            {...register("trailer", {
              required: {
                value: true,
                message: "Trailer không được để trống",
              },
            })}
          />
          {errors.trailer && (
            <p className="text-danger">{errors.trailer.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold fw-bold">Ngày Khởi Chiếu </label>
          <input
            className="form-control w-50"
            type="date"
            placeholder="Ngày Khởi Chiếu"
            {...register(
              "ngayKhoiChieu",
              {
                setValueAs: (value) => {
                  return dayjs(value).format("DD/MM/YYYY");
                },
              },
              {
                required: {
                  value: true,
                  message: "Ngày khởi chiếu không được để trống",
                },
              }
            )}
          />
          {errors.ngayKhoiChieu && (
            <p className="text-danger">{errors.ngayKhoiChieu.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary fw-bold py-2 mt-2">
          Thêm phim{" "}
        </button>
      </form>
    </div>
  );
}
