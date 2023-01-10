import React ,{useContext} from 'react'
import { format } from "date-fns";
import Calendar from "../Calendar/Calendar";
import { Link } from 'react-router-dom';
import { ReferenceDataContext } from '../context/ReferenceDataContext';
function MainCalendar() {
  const { value,setCurrentDate,prevMonth,nextMonth,data,setData,input,setInput} = useContext(ReferenceDataContext);
    // const display = props.display;
  // const value = props.value;
  // const setCurrentDate = props.onChange;
  // const prevMonth =props.prevMonth;
  // const nextMonth = props.nextMonth;

 
  return (
    <div className="month">
      <div className="main-calendar">
        <div className="display-month">
          <div className="text">{format(value, "dd LLLL yyyy")}</div>
          <Link to="/day" className="primary-button">Day</Link>
          
        </div>

        <Calendar />
      </div>
    </div>
      
    
  )
}

export default MainCalendar