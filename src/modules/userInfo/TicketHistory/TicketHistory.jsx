import React from "react";
import dayjs from "dayjs";

export default function TicketHistory({ ticketHistoryInfo }) {
  const info = ticketHistoryInfo?.thongTinDatVe?.map((historyinfo, index) => {
    return (
      <div key={index}>
        <h1>{historyinfo.tenPhim}</h1>
      </div>
    );
  });

  console.log(info);

  return (
    <div>
      <h3 class="text-left text-primary font-weight-bold ">Lịch Sử Đặt Vé</h3>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên Phim </th>
            <th scope="col">Thời Lượng Phim</th>
            <th scope="col">Tên Rạp </th>
            <th scope="col">Ngày Đặt </th>
            <th scope="col">Mã vé </th>
            <th scope="col">Tên Ghế</th>
            <th scope="col">Giá Vé </th>
            <th scope="col">Tổng Tiền</th>
          </tr>
        </thead>
        <tbody class="table-group-divider">
          {ticketHistoryInfo?.thongTinDatVe?.map((historyinfo, index) => {
            return (
              <tr className="my-5">
                <td className="text-center">{index + 1}</td>
                <td>{historyinfo.tenPhim}</td>
                <td>{historyinfo.thoiLuongPhim}</td>
                <td>
                  {historyinfo.danhSachGhe
                    ?.map((history) => history.tenCumRap)
                    .join(", ")}
                </td>
                <td>{dayjs(historyinfo.ngayDat).format("DD/MM/YYYY")}</td>
                <td>{historyinfo.maVe}</td>
                <td>
                  {historyinfo.danhSachGhe
                    ?.map((history) => history.tenGhe)
                    .join(", ")}
                </td>
                <td>{historyinfo.giaVe}</td>
                <td>{`${
                  historyinfo.giaVe * historyinfo.danhSachGhe.length
                } VND`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
