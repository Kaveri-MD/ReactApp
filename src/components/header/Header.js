import React, { useContext, useState } from "react";
import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleLeft,
  faAngleRight,
  faCalendarDay,
  faCalendarAlt,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { format, setYear,setMonth } from "date-fns";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import SearchEvent from "./SearchEvent";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";

function Header() {
  // const onChange = props.onChange;
  // const value = props.value;
  // const prevMonth = props.prevMonth;
  // const nextMonth = props.nextMonth;
  const { view, currentDate, setCurrentDate, prevMonth, nextMonth,setDay } =
    useContext(ReferenceDataContext);
  const [angle, setAngle] = useState(false);
  // const [selectYear,setSelectYear]=useState(format(currentDate, "yyyy"));
  const [monthAngle,setMonthAngle] = useState(false);
  // const [selectMonth,setSelectMonth] = useState(format(currentDate, "LLLL")); 

  const year = currentDate.getFullYear();
  // console.log(year)
  const years = Array.from(new Array(20),( val, index) => index + year);
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  function iconClick() {
    view();
  }
  function handleSetToday() {
    setCurrentDate(new Date());
  }
  const handleAngle = () => {
    setAngle(!angle);
  };
  const handleYear=(year)=>{
    setAngle(!angle);
    // setSelectYear(year)
    // const d=new Date();
    setCurrentDate(setYear(currentDate,year))
    // console.log(setYear(new Date(),year))
    // console.log(year)
  }
  const handleMonthAngle=()=>{
    setMonthAngle(!monthAngle);
  }
  const handleMonth=(index,month)=>{
    setMonthAngle(!monthAngle);
    // setSelectMonth(month);
    setCurrentDate(setMonth(currentDate,index))
    console.log(index);
  }

  return (
    <div className="header">
      <div className="left-side">
        <div className="bar-icon" onClick={() => iconClick()}>
          {/* <FontAwesomeIcon icon={faBars} /> */}
          <FontAwesomeIcon className="calendar-icon" icon={faCalendarAlt} />
          <div className="calendar">Event Scheduler </div>
        </div>
        <div className="control-yearmonth">
          {/* <div className="calendar-angle" onClick={() => prevMonth()}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </div> */}
          {/* <div className="calendar-month">{format(currentDate, "LLLL")}</div> */}
          <div className="calendar-month">
            {format(currentDate, "LLLL")}
            <FontAwesomeIcon
              onClick={handleMonthAngle}
              className="month-angle"
              icon={monthAngle ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
            {
              monthAngle && (
            <div className="month-container">
              {months.map((month,index)=>{
                return(<div className="year-dropdown" onClick={()=>handleMonth(index,month)}>{month}</div>)
               })} 
            </div>
              )
            }
          </div>
          <div className="calendar-year">
            {format(currentDate, "yyyy")}
            <FontAwesomeIcon
              onClick={handleAngle}
              className="year-angle"
              icon={angle ? faAngleUp : faAngleDown}
            ></FontAwesomeIcon>
            {
              angle && (
            <div className="dropdown-container">
              {years.map((year)=>{
                return(<div className="year-dropdown" onClick={()=>handleYear(year)}>{year}</div>)
               })} 
            </div>
              )
            }
          </div>
          {/* <div className="calendar-angle" onClick={() => nextMonth()}>
            <FontAwesomeIcon icon={faAngleRight} />
          </div> */}
        </div>
        {/* <select>
     {
       years.map((year, index) => {
         return <option key={`year${index}`} value={year}>{year}</option>
       })
     }
    </select> */}
      </div>

      <div className="right-side">
        <SearchEvent />
        <div className="view-by">
          <button className="today-button" onClick={() => handleSetToday()}>
            Today
          </button>
          <NavLink
            to="/month"
            className={({ isActive }) =>
              isActive ? "isactive" : "primary-button"
            }
          >
            Month
          </NavLink>
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
  );
}

export default Header;
