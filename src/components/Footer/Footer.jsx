import React from "react";
import { FaApple, FaRobot, FaFacebook, FaInstagram } from "react-icons/fa";
import { getMovieSystem } from "../../apis/cinemaAPI";
import { useQuery } from "@tanstack/react-query";

export default function Footer({ systemID }) {
  const { data: cinemas = [], isLoading } = useQuery({
    queryKey: ["getMovieSystem", systemID],
    queryFn: () => getMovieSystem(systemID),
  });
  return (
    <div className="bg-black">
      <div
        className="container text-secondary py-5"
        style={{ padding: "100px", paddingTop: "0px" }}
      >
        <div className="row">
          <div className="col-sm-4">
            <h5>TIX</h5>
            <div className="row">
              <div className="col-sm-6">
                <p className="mb-1">FAQ</p>
                <span>Brand Guidelines</span>
              </div>
              <div className="col-sm-6">
                <p className="mb-1">Thỏa thuận sử dụng</p>
                <span>Chính sách bảo mật</span>
              </div>
            </div>
          </div>
          <div
            className="col-sm-4"
            style={{ padding: "50px", paddingTop: "0px" }}
          >
            <h5>Đối Tác</h5>
            <div className="row">
              {cinemas.map((cinema) => {
                return (
                  <div
                    className="col-sm-3 mb-3 "
                    style={{ paddingRight: "0px" }}
                    key={cinema.maHeThongRap}
                  >
                    <img
                      href="#"
                      height={"30px"}
                      width={"30px"}
                      src={cinema.logo}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-sm-2">
            <h5> MOBBILE APP</h5>
            <div className="row">
              <div className="col-sm-2 me-3">
                <h2>
                  {" "}
                  <FaApple />
                </h2>
              </div>

              <div className="col-sm-2">
                <h2>
                  {" "}
                  <FaRobot />
                </h2>
              </div>
            </div>
          </div>
          <div className="col-sm-2">
            <h5>SOCIAL</h5>
            <div className="row">
              <div className="col-sm-2 me-3">
                <h2>
                  {" "}
                  <FaFacebook />
                </h2>
              </div>

              <div className="col-sm-2">
                <h2>
                  {" "}
                  <FaInstagram />
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
