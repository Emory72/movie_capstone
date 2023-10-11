import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function SeatItem({ seat }) {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);

  let classes = "btn border border-4 my-2 fw-bold";
  if (seat.daDat) {
    classes += " btn-danger";
  } else if (isSelected) {
    classes += " btn-success";
  } else if (seat.loaiGhe === "Vip") {
    classes += " btn-warning";
  } else {
    classes += " btn-light";
  }

  const handleSelect = () => {
    setIsSelected(!isSelected);
    dispatch({
      type: "selectSeat",
      payload: { ...seat, isSelected: !isSelected },
    });
  };
  return (
    <div>
      <button
        style={{
          width: 50,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={classes}
        disabled={seat.daDat}
        key={seat.maGhe}
        onClick={handleSelect}
      >
        {seat.tenGhe}
      </button>
    </div>
  );
}
