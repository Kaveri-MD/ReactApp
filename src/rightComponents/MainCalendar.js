import React from 'react'
import { format } from "date-fns";
import Calendar from "../components/Calendar";
import { Link } from 'react-router-dom';
function MainCalendar(props) {
    // const display = props.display;
  const value = props.value;
  const onChange = props.onChange;
  const prevMonth =props.prevMonth;
  const nextMonth = props.nextMonth;
  return (
    <div className="month">
      <div className="main-calendar">
        <div className="display-month">
          <div className="text">{format(value, "dd LLLL yyyy")}</div>
          <Link to="/day" className="primary-button">Day</Link>
          
        </div>

        <Calendar
          value={value}
          onChange={onChange}
          prevMonth={prevMonth}
          nextMonth={nextMonth}
        />
      </div>
    </div>
      
    
  )
}

export default MainCalendar