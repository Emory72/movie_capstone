import React from "react";
import Banner from "./Banner";
import Cinema from "./Cinema";
import Showing from "./Showing";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
    </div>
  );
}
