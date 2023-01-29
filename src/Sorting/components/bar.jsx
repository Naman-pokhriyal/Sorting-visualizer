import React from "react";
import "./bar.css";

export default function bars({ length, color }) {
  const colors = [
    ["rgba(61,90,241,0.5)", "rgba(61,90,241,0.2)"],
    ["rgba(255,48,79,1)", "rgba(255,48,79,0.5)"],
    ["rgba(131,232,90,0.5)", "rgba(131,232,90,0.2)"],
    ["rgba(155,38,182,0.5)", "rgba(155,38,182,0.2)"],
  ];

  const bottom = {
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "0.3s",
  };
  const front_right_left_back = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    transition: "0.3s",
  };

  return (
    <>
      <div className="bar">
        <div className="side top"></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
          <div
            className="color-bar right-color-bar"
            style={front_right_left_back}
          ></div>
        </div>
        <div className="side left">
          <div
            className="color-bar left-color-bar"
            style={front_right_left_back}
          ></div>
        </div>
        <div className="side front">
          <div
            className="color-bar front-color-bar"
            style={front_right_left_back}
          ></div>
        </div>
        <div className="side back">
          <div
            className="color-bar back-color-bar"
            style={front_right_left_back}
          ></div>
        </div>
      </div>
    </>
  );
}
