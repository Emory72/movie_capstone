import React from "react";
import { useParams } from "react-router-dom";
import Seatlist from "./Seatlist";
import SeatDetails from "./SeatDetails";
import { useQuery } from "@tanstack/react-query";
import { getSeatlist } from "../../apis/ticketAPI";

export default function Ticket() {
  const { showtimeID } = useParams();

  const { data, isLoading } = useQuery({
    queryKey:
      // phải truyền thêm tham số thứ 2 cho queryKey khi giá trị thường thay đổi để có thể gọi lại queryFn
      ["Seatlist", showtimeID],
    queryFn: () => getSeatlist(showtimeID),
    // !! ép giá trị về boolean , enabled true/false quyết định movieID có giá trị mới chạy
    enabled: !!showtimeID,
  });
  return (
    <div>
      <h1 className="text-center py-5 text-white">MOVIE SEAT SELECTION</h1>
      <div className="">
        <div className="d-flex">
          <div className="w-60 container">
            <Seatlist seatData={data} />
          </div>
          <div className="w-40">
            <SeatDetails seatData={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
