import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "../../../apis/cinemaAPI";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
      <div className="row">
        <div className="">
          {/*  render hệ thống rap  */}
          {cinemaSystems.map((cinemaSystem) => {
            return (
              <div key={cinemaSystem.maHeThongRap}>
                <img
                  src={cinemaSystem.logo}
                  alt=""
                  width={50}
                  height={50}
                  onClick={() =>
                    handleGetCinemaSystem(cinemaSystem.maHeThongRap)
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="">
          .col-md-8
          {/* render danh sách rạp  */}
          {cinemas.map((cinema) => {
            return (
              <div>
                <h3>{cinema.tenCumRap}</h3>
                {/* render lich chieu */}
                {cinema.lichChieuPhim.map((showtime) => {
                  // const date = new Date(showtime.ngayChieuGioChieu);
                  // const time = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}~${date.getHours()}:${date.getMinutes()}`;
                  const time = dayjs(showtime.ngayChieuGioChieu).format(
                    "DD-MM-YYYY ~ HH:mm"
                  );

                  return (
                    <button
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
  );
}
