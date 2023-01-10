import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  sub,
  add,
  format,
  setDate,
  endOfWeek,
} from "date-fns";
import "../../styles/calendar.scss";
import Cell from "./Cell";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import useCreateEvent from "../context/useCreateEvent";
import Modal from "react-modal";
import EventModal from "./EventModal";


function Calendar() {
  const { data, value, setCurrentDate, prevMonth, nextMonth, getId, setGetId } =
    useContext(ReferenceDataContext);

    
    // console.log(id);
  // const { input, setInput, data, setData } = props;

  // const value = props.value;
  // const onChange = props.onChange;
  // const prevMonth = props.prevMonth;
  // const nextMonth = props.nextMonth;

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
  const selectedDate = (index) => {
    const date = setDate(value, index);
    setCurrentDate(date);
  };
  // const [getId, setGetId] = useState();
  const [event, setEvent] = useState(false);

  const eventClick = (id) => {
    setGetId(id);
    setEvent(!event);
    // console.log(event);
  };
  console.log(getId);
  return (
    <div>
      {/* <div>Selected Date:{format(value,"dd LLLL yyyy")}</div> */}
      <div className="calendar-container">
        <div className="calendar-angle" onClick={() => prevMonth()}>
          <Cell>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Cell>
        </div>
        <div className="calendar-month">
          <Cell>{format(value, "LLLL yyyy")}</Cell>
        </div>
        <div className="calendar-angle" onClick={() => nextMonth()}>
          <Cell>
            <FontAwesomeIcon icon={faAngleRight} />
          </Cell>
        </div>
        {weeks.map((week) => (
          <div className="calendar-week">
            <Cell>{week}</Cell>
          </div>
        ))}
        {Array.from({ length: prefixDate }).map((date, index) => (
          <div className="calendar-item">
            <Cell></Cell>
          </div>
        ))}

        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === value.getDate();

          // console.log(value.getDate());

          return (
            <div className="calendar-item" onClick={() => selectedDate(date)}>
              <Cell key={date} isActive={isCurrentDate}>
                <div>{date}</div>
              </Cell>
              <Cell>
                {data &&
                  data.map(
                    (item) =>
                      item.fromTime.slice(0, 10) ===
                        format(setDate(value, date), "yyyy-MM-dd") && (
                        <div className="display-event" onClick={()=>{eventClick(item.id)}} >
                          {item.eventName}
                        </div>
                      )
                  )}
              </Cell>
            </div>
          );
        })}
        {Array.from({ length: suffixDate }).map((date, index) => (
          <div className="calendar-item">
            <Cell></Cell>
          </div>
        ))}
            {event && (
        <Modal isOpen={event} ariaHideApp={false} className="modal">
          <EventModal eventClick={eventClick} getId={getId} />
        </Modal>
      )}
      </div>
    </div>
  );
}

export default Calendar;

// //{data.map((item)=>console.log(item.title))}

// import React, { useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import {
//   startOfMonth,
//   endOfMonth,
//   differenceInDays,
//   sub,
//   add,
//   format,
//   setDate,
//   endOfWeek,
// } from "date-fns";
// import "../../styles/calendar.scss";
// import Cell from "./Cell";
// import {ReferenceDataContext} from "../context/ReferenceDataContext"
// import useCreateEvent from "../context/useCreateEvent";

// function Calendar() {

//   const { data,value,onChange,prevMonth,nextMonth} = useContext(ReferenceDataContext);
//   // const { input, setInput, data, setData } = props;

//   // const value = props.value;
//   // const onChange = props.onChange;
//   // const prevMonth = props.prevMonth;
//   // const nextMonth = props.nextMonth;

//   const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   const startDate = startOfMonth(value);
//   const endDate = endOfMonth(value);
//   const numDays = differenceInDays(endDate, startDate) + 1;

//   const prefixDate = startDate.getDay();
//   const suffixDate = 6 - endDate.getDay();

//   // const prevMonth=() =>{
//   //   onChange(sub(value,{months:1}));
//   // }
//   // const nextMonth=() =>{
//   //   onChange(add(value,{months:1}));
//   // }
//   const selectedDate = (index) => {
//     const date = setDate(value, index);
//     onChange(date);
//   };

//   return (
//     <div>
//       {/* <div>Selected Date:{format(value,"dd LLLL yyyy")}</div> */}
//       <div className="calendar-container">
//         <div className="calendar-angle" onClick={() => prevMonth()}>
//           <Cell>
//             <FontAwesomeIcon icon={faAngleLeft} />
//           </Cell>
//         </div>
//         <div className="calendar-month">
//           <Cell>{format(value, "LLLL yyyy")}</Cell>
//         </div>
//         <div className="calendar-angle" onClick={() => nextMonth()}>
//           <Cell>
//             <FontAwesomeIcon icon={faAngleRight} />
//           </Cell>
//         </div>
//         {weeks.map((week) => (
//           <div className="calendar-week">
//             <Cell>{week}</Cell>
//           </div>
//         ))}
//         {Array.from({ length: prefixDate }).map((date, index) => (
//           <div className="calendar-item">
//             <Cell></Cell>
//           </div>
//         ))}

//         {Array.from({ length: numDays }).map((_, index) => {
//           const date = index + 1;
//           const isCurrentDate = date === value.getDate();

//           // console.log(value.getDate());

//           return (
//             <div className="calendar-item" onClick={() => selectedDate(date)}>
//               <Cell key={date} isActive={isCurrentDate}>
//                 <div>{date}</div>
//               </Cell>
//               <Cell>
//                 {data &&
//                   data.map(
//                     (item) =>
//                       item.date ===
//                         format(setDate(value, date), "yyyy-MM-dd") && (
//                         <div className="display-event">{item.title}</div>
//                       )
//                   )}
//               </Cell>
//             </div>
//           );
//         })}
//         {Array.from({ length: suffixDate }).map((date, index) => (
//           <div className="calendar-item">
//             <Cell></Cell>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Calendar;
