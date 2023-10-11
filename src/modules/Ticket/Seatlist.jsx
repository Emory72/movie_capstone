import React from "react";

import SeatItem from "./SeatItem";

export default function Seatlist({ seatData }) {
  // const { data: seatData, isLoading } = useQuery({
  //   queryKey:
  //     // phải truyền thêm tham số thứ 2 cho queryKey khi giá trị thường thay đổi để có thể gọi lại queryFn
  //     ["Seatlist", showtimeID],
  //   queryFn: () => getSeatlist(showtimeID),
  //   // !! ép giá trị về boolean , enabled true/false quyết định movieID có giá trị mới chạy
  //   enabled: !!showtimeID,
  // });

  return (
    <div className="row ">
      {seatData?.danhSachGhe.map((seat) => (
        <div className="col-1">
          <SeatItem seat={seat} />
        </div>
      ))}

      <div className="d-flex justify-content-center ">
        <div>
          <button className="btn btn-danger disabled"></button>
          <span>Đã Đặt</span>
        </div>
        <div>
          <button className="btn btn-light border border-4"></button>
          <span>Thường</span>
        </div>
        <div>
          <button className="btn btn-warning"></button>
          <span>VIP</span>
        </div>
      </div>
    </div>
  );
}
