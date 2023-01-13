import React, { useContext } from "react";
import "../../styles/rightNavigation.scss";
import DisplayTime from "./DisplayTime";

import { Routes, Route } from "react-router-dom";
import MainCalendar from "./MainCalendar";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
function RightNavigation() {
  const { display, view, value, setCurrentDate, prevMonth, nextMonth } =
    useContext(ReferenceDataContext);
  // const display = props.display;
  // const value = props.value;
  // const setCurrentDate = props.onChange;
  // const prevMonth = props.prevMonth;
  // const nextMonth = props.nextMonth;

  return (
    <div className={display ? "right-navigation" : "right-iconclick"}>
      <Routes>
        <Route path="/month" element={<MainCalendar />} />

        <Route path="/" element={<DisplayTime />} />
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
