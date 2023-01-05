import React ,{useEffect} from 'react'
import { format } from "date-fns";
import Calendar from "../Calendar/Calendar";
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

        <Calendar input={props.input} setInput={props.setInput} data={props.data} setData={props.setData}
        
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