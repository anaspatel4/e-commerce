import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  const redirecting = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      redirecting("/login");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
}
export default Protected;
