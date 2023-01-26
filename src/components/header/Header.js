import React, { useContext, useState } from "react";
import "../../styles/header/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { format, setYear, setMonth } from "date-fns";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import SearchEvent from "./SearchEvent";
import { NavLink } from "react-router-dom";

function Header() {
  const { currentDate, setCurrentDate ,angle, setAngle,monthAngle, setMonthAngle} = useContext(ReferenceDataContext);
  // const [angle, setAngle] = useState(false);
  // const [monthAngle, setMonthAngle] = useState(false);

  const year = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => index + year);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleSetToday() {
    setCurrentDate(new Date());
  }
  const handleAngle = () => {
    setAngle(!angle);
  };
  const handleYear = (year) => {
    setAngle(!angle);
    setCurrentDate(setYear(currentDate, year));
  };
  const handleMonthAngle = () => {
    setMonthAngle(!monthAngle);
  };
  const handleMonth = (index, month) => {
    setMonthAngle(!monthAngle);
    setCurrentDate(setMonth(currentDate, index));
    console.log(index);
  };

  return (
    <div className="header">
      <div className="left-side">
        <div className="icon">
          <FontAwesomeIcon className="calendar-icon" icon={faCalendarAlt} />
          <div className="scheduler">Event Scheduler </div>
        </div>
        <div className="control-yearmonth">
          <div className="calendar-month">
            {format(currentDate, "LLLL")}
            <FontAwesomeIcon
              onClick={handleMonthAngle}
              className="month-angle"
              icon={monthAngle ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
            {monthAngle && (
              <div className="month-container">
                {months.map((month, index) => {
                  return (
                    <div
                      className="year-dropdown"
                      onClick={() => handleMonth(index, month)}
                    >
                      {month}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="calendar-year">
            {format(currentDate, "yyyy")}
            <FontAwesomeIcon
              onClick={handleAngle}
              className="year-angle"
              icon={angle ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
            {angle && (
              <div className="dropdown-container">
                {years.map((year) => {
                  return (
                    <div
                      className="year-dropdown"
                      onClick={() => handleYear(year)}
                    >
                      {year}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="right-side">
        <SearchEvent />
        <div className="view-by">
          <button className="today-button" onClick={() => handleSetToday()}>
            Today
          </button>
          <div onClick={()=>handleSetToday()}>
          <NavLink
            to="/month"
            className={({ isActive }) =>
              isActive ? "isactive" : "primary-button"
            }
          >
            Month
          </NavLink>
          </div>
          <div onClick={()=>handleSetToday()}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "isactive" : "primary-button"
            }
          >
            Day
          </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
