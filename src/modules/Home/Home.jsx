import React from "react";
import Banner from "./Banner";
import Cinema from "./Cinema";
import Showing from "./Showing";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Banner />
      <Showing />
      <Cinema />
      <Footer />
    </div>
  );
}
