import React from "react";
import { MdOutlineWarningAmber } from "react-icons/md";
import "./NoData.css";

function NoData(props) {
  const {msg}=props
  return (
    <div className="no-data-main">
      <span style={{ fontSize: "40px", color: "#ed6c02" }}>
        <MdOutlineWarningAmber />
      </span>
      <span style={{ fontSize: "20px", color: "#ed6c02" }}>{msg?msg:"No data found"}</span>
    </div>
  );
}

export default NoData;
