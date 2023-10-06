import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../../apis/movieAPI";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";

export default function Banner() {
  const {
    data: banners = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ["banners"], queryFn: getBanner });

  if (isLoading) {
    return <h1>Loading ...</h1>;
    // return <Loading/>
    //Do component tái sử dụng nhiều lần nên để trong file components
  }

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
  };
  return (
    <Slider {...slickSettings}>
      {banners.map((banner) => {
        return (
          <img key={banner.maBanner} height={800} src={banner.hinhAnh} alt="" />
        );
      })}
    </Slider>
  );
}
