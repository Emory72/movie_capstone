import React from "react";
import { getSeatlist } from "../../apis/ticketAPI";
import { useSelector } from "react-redux";
import ProtectedRoute from "../../routers/ProtectedRoute/ProtectedRoute";

export default function SeatDetails({ seatData }) {
  const { selectedSeats, totalPrice } = useSelector((state) => {
    return state.movieTicket;
  });
  return (
    <div className="bg-white  py-5 px-5 rounded">
      <div className="d-flex">
        <h3>{totalPrice.toLocaleString()}</h3>
      </div>
      <hr />
      <div>
        <h3>Cụm Rạp:</h3>
        <h3>{seatData?.thongTinPhim.tenCumRap}</h3>
      </div>
      <hr />
      <div>
        <h3>Địa chỉ:</h3>
        <h3>{seatData?.thongTinPhim.diaChi}</h3>
      </div>
      <hr />
      <div>
        <h3>Rạp:</h3>
        <h3>{seatData?.thongTinPhim.tenRap}</h3>
      </div>
      <hr />
      <div>
        <h3>
          Ngày giờ chiếu:
          {seatData?.thongTinPhim.ngayChieu} - {seatData?.thongTinPhim.gioChieu}
        </h3>
      </div>
      <hr />
      <div>
        <h3>Tên Phim:</h3>
        <h3>{seatData?.thongTinPhim.tenPhim}</h3>
      </div>
      <hr />

      <div>
        <h3>Chọn:</h3>
        <h3>{selectedSeats.map((item) => item.tenGhe).join(",")}</h3>
      </div>
      <hr />
      <div>
        <ProtectedRoute>
          <button
            className="btn btn-danger w-100 h-100 py-3"
            onClick={() =>
              alert(`Tổng tiền vé phim: ${totalPrice.toLocaleString()}`)
            }
          >
            Đặt Vé
          </button>
        </ProtectedRoute>
      </div>
    </div>
  );
}
