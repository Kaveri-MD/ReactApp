import React,{useContext} from "react";
import "../../styles/header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faAngleLeft,
  faAngleRight,
  
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import {ReferenceDataContext} from "../context/ReferenceDataContext"
import SearchEvent from "./SearchEvent";
// import { Routes, Route } from "react-router-dom";

function Header() {

  // const onChange = props.onChange;
  // const value = props.value;
  // const prevMonth = props.prevMonth;
  // const nextMonth = props.nextMonth;
  const { view,value,setCurrentDate,prevMonth,nextMonth} = useContext(ReferenceDataContext);
  function iconClick() {
    view();
  }
  function handleSetToday() {
    setCurrentDate(new Date());
  }
  return (
    <div className="header">
      <div className="left-side">
        <div className="bar-icon" onClick={() => iconClick()}>
          <FontAwesomeIcon icon={faBars} />
          <div className="calendar">Calendar</div>
        </div>
        <button className="today-button" onClick={() => handleSetToday()}>
          Today
        </button>
        <div className="calendar-angle" onClick={() => prevMonth()}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div className="calendar-month">{format(value, "LLLL")}</div>
        <div className="calendar-angle" onClick={() => nextMonth()}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>

      <div className="right-side">
        <SearchEvent/>
        <div className="year">{format(value, "yyyy")}</div>
      </div>
    </div>
  );
}

export default Header;
