import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faAngleRight} from "@fortawesome/free-solid-svg-icons";
import { startOfMonth, endOfMonth, differenceInDays ,sub, add, format, setDate, endOfWeek} from "date-fns";
import "../styles/calendar.scss";
import Cell from "./Cell";

function Calendar(props) {
  const value = props.value;
  const onChange = props.onChange;
  const prevMonth =props.prevMonth;
  const nextMonth = props.nextMonth;
  
 
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfMonth(value);
  const endDate = endOfMonth(value);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDate = startDate.getDay();
  const suffixDate = 6 - endDate.getDay();

  // const prevMonth=() =>{
  //   onChange(sub(value,{months:1}));
  // }
  // const nextMonth=() =>{
  //   onChange(add(value,{months:1}));
  // }
  const selectedDate=(index) =>{
    const date = setDate(value,index);
    onChange(date);
  }

  return (
    <div>
      {/* <div>Selected Date:{format(value,"dd LLLL yyyy")}</div> */}
      <div className="calendar-container">
        <div className="calendar-angle" onClick={()=>prevMonth()}><Cell><FontAwesomeIcon icon={faAngleLeft}/></Cell></div>
        <div className="calendar-month"><Cell>{format(value,"LLLL yyyy")}</Cell></div>
        <div className="calendar-angle" onClick={()=>nextMonth()}><Cell><FontAwesomeIcon icon={faAngleRight}/></Cell></div>
        {weeks.map((week) => (
          <div className="calendar-week">
            <Cell>{week}</Cell>
          </div>
        ))}
        {Array.from({ length: prefixDate }).map((date, index) => (
          <div className="calendar-item"><Cell></Cell></div>
        ))}
        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === value.getDate();
          
          return(
            <div className="calendar-item" onClick = {()=>selectedDate(date)} >
              <Cell key={date} isActive = {isCurrentDate} >{date}</Cell>
            </div>
          )
        }
        )}
        {Array.from({ length: suffixDate }).map((date, index) => (
          <div className="calendar-item"><Cell></Cell></div>
        ))}
      </div>
      </div>
  );
}

export default Calendar;


