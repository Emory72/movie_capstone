import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { addMovie } from "../../../apis/movieAPI";
import * as dayjs from "dayjs";

export default function AddMovie() {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      hinhAnh: "",
      trailer: "",
      ngayKhoiChieu: "",
    },
  });

  const hinhAnh = watch("hinhAnh");
  const [imgPreview, setimgPreview] = useState("");
  useEffect(() => {
    //Chạy vào useEffect callback khi giá tri hinhAnh bị thay đổi
    const file = hinhAnh?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (evt) => {
      setimgPreview(evt.target.result);
    };
  }, [hinhAnh]);

  const { mutate: onSubmit } = useMutation({
    mutationFn: (values) => {
      console.log(values);

      const formData = new FormData();
      formData.append("temPhim", values.tenPhim);
      formData.append("biDanh", values.biDanh);
      formData.append("moTa", values.moTa);
      formData.append("hinhAnh", values.hinhAnh[0]);
      formData.append("trailer", values.trailer);
      formData.append("ngayKhoiChieu", values.ngayKhoiChieu);
      formData.append("maNhom", "GP13");

      return addMovie(formData);
    },
    onSuccess: () => {
      //Đóng modal hoặc chuyển trang
      // Sử dụng queryClient.invalidateQuerries để gọi lại API get danh sách phim
    },
  });

  return (
    <div>
      <h1>AddMovie</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input placeholder="Tên Phim" {...register("tenPhim")} />
        </div>
        <div>
          <input placeholder="Bí Danh " {...register("biDanh")} />
        </div>
        <div>
          <input placeholder="Mô Tả" {...register("moTa")} />
        </div>
        <div>
          <input type="file" placeholder="Hình Ảnh" {...register("hinhAnh")} />
          {imgPreview && (
            <div>
              <img src={imgPreview} alt="preview" width={200} height={200} />
            </div>
          )}
        </div>
        <div>
          <input placeholder="Trailer" {...register("trailer")} />
        </div>
        <div>
          <input
            type="date"
            placeholder="Ngày Khởi Chiếu"
            {...register("ngayKhoiChieu", {
              setValueAs: (value) => {
                return dayjs(value).format("DD/MM/YYYY");
              },
            })}
          />
        </div>

        <button>Thêm phim </button>
      </form>
    </div>
  );
}
