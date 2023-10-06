import React from "react";

import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimes } from "../../../apis/cinemaAPI";
import Logo from "./Logo";
import Address from "./Address";
import CinemaShowTimes from "./CinemaShowTimes";

export default function Cinema({ movieID }) {
  const { data = {}, isLoading } = useQuery({
    queryKey: ["movieShowtimes", movieID],
    queryFn: () => getMovieShowtimes(movieID),
    enabled: !!movieID,
  });
  console.log(data);
  const cinemaSystems = data.heThongRapChieu || [];
  return (
    <div className="container py-5">
      <h1>Cinema</h1>
      <div className="row">
        <div className="col col-lg-2">
          <Logo />
        </div>
        <div className="col-md-auto">
          <Address />
        </div>
        <div className="col">
          <CinemaShowTimes />
        </div>
      </div>
    </div>
  );
}
