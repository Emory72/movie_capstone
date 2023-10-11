import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import ReactPlayer from "react-player/youtube";
import { colors } from "@mui/material";

export default function Showtimes({ movieID }) {
  const [cinemas, setCinemas] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey:
      // phải truyền thêm tham số thứ 2 cho queryKey khi giá trị thường thay đổi để có thể gọi lại queryFn
      ["movieShowtime", movieID],
    queryFn: () => getMovieShowtimes(movieID),
    // !! ép giá trị về boolean , enabled true/false quyết định movieID có giá trị mới chạy
    enabled: !!movieID,
  });

  const cinemaSystems = data?.heThongRapChieu || [];

  const handleGetCinemaSystem = (cinemaSystemID) => {
    const found = cinemaSystems.find(
      (item) => item.maHeThongRap === cinemaSystemID
    );
    setCinemas(found.cumRapChieu);
  };
  console.log(cinemas);

  // Khi cinemaSystems thay đổi thì chạy lại hệ thống rạp, cinemaSystems có dữ liệu thì mặc định hiển thị hệ thống rạp đầu tiên trong API mặc dù user chưa click vào
  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setCinemas(cinemaSystems[0].cumRapChieu);
    }
  }, [cinemaSystems]);

  const navigate = useNavigate();
  return (
    <div className="container py-5">
      <div>
        <div className="row mb-5 d-flex align-items-center">
          <div className="col-4 rounded">
            <img
              src={data?.hinhAnh}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "80%", // To ensure it fits within the container
                maxHeight: "100%", // To ensure it fits within the container
              }}
            />
          </div>
          <div className="col-4 text-white">
            <h5>{dayjs(data?.ngayKhoiChieu).format("DD-MM-YYYY")}</h5>
            <h3>{data?.tenPhim}</h3>
            <p>
              {data?.heThongRapChieu.map((heThongRapChieu) => (
                <span key={heThongRapChieu.maHeThongRap}>
                  {heThongRapChieu.cumRapChieu[0].lichChieuPhim[0].thoiLuong}{" "}
                  Phút
                </span>
              ))}
            </p>
            <button className="btn btn-danger " id="buyButton">
              Mua Vé
            </button>
          </div>
          <div className="col-4">
            <div className="d-flex flex-column align-items-end ">
              <div
                className="border border-5 rounded-circle border-success"
                style={{
                  width: 100,
                  height: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-white " style={{ fontSize: 70 }}>
                  {data?.danhGia}
                </div>
              </div>
              <span className="mt-2 " style={{ color: "rgb(251, 66, 38)" }}>
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </span>
            </div>
          </div>
        </div>

        <div className="row border border-3 py-5 bg-white rounded">
          <div className="col-2 border-end">
            {/*  render hệ thống rap  */}
            {cinemaSystems.map((cinemaSystem) => {
              return (
                <div
                  key={cinemaSystem.maHeThongRap}
                  className="border-bottom d-flex justify-content-center"
                >
                  <img
                    className="my-3 "
                    src={cinemaSystem.logo}
                    alt=""
                    width={100}
                    height={100}
                    onClick={() =>
                      handleGetCinemaSystem(cinemaSystem.maHeThongRap)
                    }
                  />
                </div>
              );
            })}
          </div>
          <div className="col-8 ps-5">
            {/* render danh sách rạp  */}
            {cinemas.map((cinema) => {
              return (
                <div>
                  <h3 className="text-success">{cinema.tenCumRap}</h3>
                  {/* render lich chieu */}
                  {cinema.lichChieuPhim.map((showtime) => {
                    // const date = new Date(showtime.ngayChieuGioChieu);
                    // const time = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}~${date.getHours()}:${date.getMinutes()}`;
                    const time = dayjs(showtime.ngayChieuGioChieu).format(
                      "DD-MM-YYYY ~ HH:mm"
                    );

                    return (
                      <button
                        className="btn btn-light border border-3 py-3 mt-2 me-4"
                        onClick={() =>
                          navigate(`/ticket/${showtime.maLichChieu}`)
                        }
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
