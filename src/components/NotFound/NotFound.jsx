import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>NotFound</h1>
      <button onClick={() => navigate("/")}>Go to Home Page</button>
    </div>
  );
}
