import React, { useContext } from "react";
import "../../styles/rightNavigation.scss";
import DisplayTime from "./DisplayTime";

import { Routes, Route } from "react-router-dom";
import MainCalendar from "./MainCalendar";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation ,faXmark} from "@fortawesome/free-solid-svg-icons";
function RightNavigation() {
  const { display, view, value, setCurrentDate, prevMonth, nextMonth,error,setError,errorPopUp,setErrorPopUp } =
    useContext(ReferenceDataContext);
  // const display = props.display;
  // const value = props.value;
  // const setCurrentDate = props.onChange;
  // const prevMonth = props.prevMonth;
  // const nextMonth = props.nextMonth;
  console.log(error)
  const handleXmark=()=>{
    setErrorPopUp(false)
    // setError("")
  }
  return (
    <div className={display ? "right-navigation" : "right-iconclick"}>
      {
         (error  && errorPopUp) &&( 

      <div className="error-container">
        <FontAwesomeIcon className="x-mark" icon={faXmark} onClick={handleXmark}/>
        <div className="error-message">
          
          {error}
          </div>
        
        </div>
        ) 
       } 

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
