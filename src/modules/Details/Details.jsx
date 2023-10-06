import React from "react";
import MovieProfile from "./MovieProfile";
import Showtimes from "./Showtimes";
import { useParams } from "react-router-dom";

export default function Details() {
  const { movieID } = useParams();
  return (
    <div>
      <MovieProfile movieID={movieID} />
      <Showtimes movieID={movieID} />
    </div>
  );
}
