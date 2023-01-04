import React, { useState } from "react";
import { ListItem } from "../lists/List";
import { format } from "date-fns";
import { Link } from "react-router-dom";
function DisplayTime({ value }) {
  return (
    <div>
      <div className="display-day">
        <div className="day">
        <div>{format(value, "EEEE")}</div>
        <div>{format(value, "d")}</div>
        </div>
        
        <Link to="/" className="primary-button">Month</Link>
      </div>
      <div className="time-chart">
        <div className="grid-container">
          {ListItem.map((item) => (
            <div className="grid-item">{item.time}</div>
          ))}
        </div>
        <div className="row">
          {ListItem.map(() => (
            <div className="horizontal-bar"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DisplayTime;
