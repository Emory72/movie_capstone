import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../apis/movieAPI";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovie,
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading ...</h1>;
    // return <Loading/>
    //Do component tái sử dụng nhiều lần nên để trong file components
  }

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,
    arrows: true,
    autoplay: true,
  };

  return (
    <div id="showing" className="container py-5">
      <div className="row h-{300}">
        <Slider {...slickSettings}>
          {data.map((movie) => (
            <div className="col-4  " key={movie.maPhim}>
              <div>
                <img
                  src={movie.hinhAnh}
                  width={400}
                  height={600}
                  className="rounded"
                />
                <div className="fw-bold fs-5 py-2 text-white">
                  <span className="bg-danger fw-bold text-white px-2 py-1 rounded me-3">
                    C18
                  </span>
                  {movie.tenPhim}
                </div>
                <div className="py-2 text-truncate fs-5 text-white  ">
                  {movie.moTa}
                </div>
                <button
                  onClick={() => navigate(`/movie/${movie.maPhim}`)}
                  className="btn btn-danger mb-5 me-2"
                  width={100}
                  height={10}
                >
                  Mua Vé
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
