import React from "react";
import { getMovieSystem } from "../../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";

export default function Logo() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["getMovieSystem"],
    queryFn: getMovieSystem,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="">
      {data.map((system) => {
        return (
          <img
            key={system.maHeThongRap}
            width={50}
            height={50}
            src={system.logo}
            alt=""
          />
        );
      })}
    </div>
  );
}
