import React, { useState } from "react";
import { getMovieSystem } from "../../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";

export default function Logo({ systemID }) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["getMovieSystem", systemID],
    queryFn: getMovieSystem,
  });
  const handleShowAdress = (data) => {};

  return (
    <div>
      <h1>Logo</h1>
      {/* <button onClick={()=>handleShowAdress()} key={{cinema.maHeThongRap}}> */}

      {/* </button> */}
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
