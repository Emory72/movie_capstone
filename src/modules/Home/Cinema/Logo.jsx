import React from "react";
import { getMovieSystem } from "../../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";

export default function Logo({ systemID }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["getMovieSystem", systemID],
    queryFn: () => getMovieSystem(systemID),
  });

  return (
    <div>
      <h1>Logo</h1>
      {data.map((system) => {
        return (
          <img
            key={system.maHeThongRap}
            height={500}
            src={system.logo}
            alt=""
          />
        );
      })}
    </div>
  );
}
