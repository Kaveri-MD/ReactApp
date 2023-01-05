import React from "react";
import "../../styles/rightNavigation.scss";
import DisplayTime from "./DisplayTime";

import { Routes, Route } from "react-router-dom";
import MainCalendar from "./MainCalendar";
function RightNavigation(props) {
  const display = props.display;
  const value = props.value;
  const onChange = props.onChange;
  const prevMonth = props.prevMonth;
  const nextMonth = props.nextMonth;
  return (
    
        <div className={props.display ? "right-navigation" : "right-iconclick"}>
          
            <Routes>
            <Route
        path="/"
        element={
          <MainCalendar input={props.input} setInput={props.setInput} data={props.data} setData={props.setData}
            display={display}
            value={value}
            onChange={onChange}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
          />
        }
      />

        <Route path="/day" element={<DisplayTime value={props.value} />} />
          
       
     
            </Routes>
      
      </div>
    // <div className={props.display ? "right-navigation" : "right-iconclick"}>
    //   <div className="main-calendar">
    //     <div className="display-month">
    //       <div className="text">{format(props.value, "dd LLLL yyyy")}</div>
    //       <button>Day</button>
    //     </div>

    //     <Calendar
    //       value={props.value}
    //       onChange={props.onChange}
    //       prevMonth={props.prevMonth}
    //       nextMonth={props.nextMonth}
    //     />
    //   </div>
    //   <DisplayTime value={props.value} />
    // </div>
  );
}

export default RightNavigation;
