import React from "react";
import Logo from "./Logo";
import Address from "./Address";
import CinemaShowTimes from "./CinemaShowTimes";

export default function Cinema() {
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
