import React from "react";

const Button = ({ onPress, width, value, backgroundColor, color }) => (
  <button
    onClick={onPress}
    style={{
      width: width,
      border: "none",
      borderRadius: "5px",
      backgroundColor: backgroundColor,
      color: color,
      padding: "5px 10px",
      margin: "10px 0",
    }}
  >
    {value}
  </button>
);

export default Button;
