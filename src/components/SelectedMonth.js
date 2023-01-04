import React from 'react'
import Cell from "./Cell";
import useMonth from "./Hooks/useMonth";
import {  format} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft,faAngleRight} from "@fortawesome/free-solid-svg-icons";
import "../styles/calendar.scss";
function SelectedMonth() {
  const [prevMonth,nextMonth,value,onChange] = useMonth();


  return (
    <div className="container">
        <div className="calendar-item" onClick={()=>prevMonth()}><Cell><FontAwesomeIcon icon={faAngleLeft}/></Cell></div>
        <div className="calendar-month"><Cell>{format(value,"LLLL yyyy")}</Cell></div>
        <div className="calendar-item" onClick={()=>nextMonth()}><Cell><FontAwesomeIcon icon={faAngleRight}/></Cell></div>
    </div>
    
  )
}

export default SelectedMonth