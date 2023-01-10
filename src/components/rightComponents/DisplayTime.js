import React, { useContext, useState } from "react";
import { ListItem } from "../../lists/List";
import { format, set, setDate } from "date-fns";
import { Link } from "react-router-dom";
import moment from "moment";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import Modal from "react-modal";
import EventModal from "../Calendar/EventModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import EllipsisMenu from "./EllipsisMenu";
import DeleteModal from "./DeleteModal";

function DisplayTime() {
  const { value, data, getId, setGetId } = useContext(ReferenceDataContext);
  // const [getId, setGetId] = useState();
  // const [event, setEvent] = useState(false);
  const [icon, setIcon] = useState(false);
  console.log(icon);

  // const eventClick = (id) => {
  //   setGetId(id);
  //   setEvent(!event);
  //   // console.log(event);
  // };

  const DotClick = (id) => {
    setIcon(!icon);
    setGetId(id);
  };
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });

  // const { value, data } = props;
  return (
    <div>
      <div className="display-day">
        <div className="day">
          <div>{format(value, "EEEE")}</div>
          <div>{format(value, "d")}</div>
        </div>

        <Link to="/" className="primary-button">
          Month
        </Link>
      </div>
      <div className="time-chart">
        <div className="grid-container">
          {ListItem.map((item) => (
            <div className="grid-item">{item.time}</div>
          ))}
        </div>
        <div className="row">
          {ListItem.map((item) => (
            <div className="horizontal-bar"></div>
          ))}
          {data &&
            data.map((item) => {
              // const hour = moment(item.to, "hr:mm").diff(
              //   moment(item.from, "hr:mm"),
              //   "hours"
              // );
              const minutes = moment(item.toTime.slice(11, 16), "hh:mm").diff(
                moment(item.fromTime.slice(11, 16), "hh:mm"),
                "minutes"
              );
              const startTime = moment.duration(
                item.fromTime.slice(11, 16),
                "hours"
              );
              const startMinute = (startTime.minutes() / 60) * 50;
              // console.log(startTime.hours(), "hr");
              // console.log(startMinute, "minute");
              // console.log(minutes, "min");
              // console.log(moment(item.to, "hh:mm"));
              // console.log(hour + min.minutes());
              const setHeight = (minutes / 60) * 51;
              // console.log(setHeight, "height");
              const setTop = 100 + (51 * startTime.hours() + startMinute);
              // console.log(setTop - 100, "top");

              return (
                item.fromTime.slice(0, 10) === format(value, "yyyy-MM-dd") && (
                  <div
                    className="display-eventbar"
                    style={{ height: setHeight, top: setTop }}
                    // onClick={DotClick}
                  >
                    <div className="event-name">
                      {item.eventName}{" "}
                      <FontAwesomeIcon
                        className="dot-icon"
                        icon={faEllipsisVertical}
                        onClick={() => {
                          DotClick(item.id);
                        }}
                      />
                      {item.id === getId && (
                        <div className={icon ? "menu" : "menu-inactive"}>
                          <EllipsisMenu
                            icon={icon}
                            setIcon={setIcon}
                            filteredEvent={filteredEvent}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              );
            })}
        </div>
        <div className="agenda">
          <div className="day-planner">Day Planner</div>
          {data &&
            data.map((item) => {
              const from =
                item.fromTime.slice(11, 13) % 12 === 0
                  ? 12
                  : item.fromTime.slice(11, 13) % 12;
              const to =
                item.toTime.slice(11, 13) % 12 === 0
                  ? 12
                  : item.toTime.slice(11, 13) % 12;
              const fromMeridiem =
                item.fromTime.slice(11, 13) < 12 ? "am" : "pm";
              const toMeridiem = item.toTime.slice(11, 13) < 12 ? "am" : "pm";
              return (
                item.fromTime.slice(0, 10) === format(value, "yyyy-MM-dd") && (
                  <div className="event-notes">
                    <div className="title">
                      <div className="title-text">Event</div>
                      <div>
                        : {item.eventName}
                      </div>
                    </div>
                    {/* <div>: </div> */}
                    <div className="from-time">
                      <div className="from-text">Time</div>
                      <div>
                      :{" "}
                      {from + item.fromTime.slice(13, 16) + " " + fromMeridiem}{" "}
                      - {to + item.toTime.slice(13, 16) + " " + toMeridiem}
                    </div>
                    </div>
                    
                  </div>
                )
              );
            })}
        </div>

        {/* {event && (
          <Modal isOpen={event} ariaHideApp={false} className="modal">
            <DeleteModal eventClick={eventClick} getId={getId} />
          </Modal>
        )} */}
      </div>
    </div>
  );
}
export default DisplayTime;

// import React, { useContext } from "react";
// import { ListItem } from "../../lists/List";
// import { format, set, setDate } from "date-fns";
// import { Link } from "react-router-dom";
// import moment from "moment";
// import { ReferenceDataContext } from "../context/ReferenceDataContext";

// function DisplayTime() {
//   const { value, data } = useContext(ReferenceDataContext);

//   // const { value, data } = props;
//   return (
//     <div>
//       <div className="display-day">
//         <div className="day">
//           <div>{format(value, "EEEE")}</div>
//           <div>{format(value, "d")}</div>
//         </div>

//         <Link to="/" className="primary-button">
//           Month
//         </Link>
//       </div>
//       <div className="time-chart">
//         <div className="grid-container">
//           {ListItem.map((item) => (
//             <div className="grid-item">{item.time}</div>
//           ))}
//         </div>
//         <div className="row">
//           {ListItem.map((item) => (
//             <div className="horizontal-bar"></div>
//           ))}
//           {data &&
//             data.map((item) => {
//               // const hour = moment(item.to, "hr:mm").diff(
//               //   moment(item.from, "hr:mm"),
//               //   "hours"
//               // );
//               const minutes = moment(item.to, "hh:mm").diff(
//                 moment(item.from, "hh:mm"),
//                 "minutes"
//               );
//               const startTime = moment.duration(item.from, "hours");
//               const startMinute = (startTime.minutes() / 60) * 50;
//               console.log(startTime.hours(), "hr");
//               console.log(startMinute, "minute");
//               console.log(minutes, "min");
//               // console.log(moment(item.to, "hh:mm"));
//               // console.log(hour + min.minutes());
//               const setHeight = (minutes / 60) * 51;
//               console.log(setHeight, "height");
//               const setTop = 94 + (51 * startTime.hours() + startMinute);
//               console.log(setTop - 94, "top");

//               return (
//                 item.date === format(value, "yyyy-MM-dd") && (
//                   <div
//                     className="display-eventbar"
//                     style={{ height: setHeight, top: setTop }}
//                   >
//                     {item.title}
//                   </div>
//                 )
//               );
//             })}
//         </div>
//         <div className="agenda">
//           {data &&
//             data.map((item) => {
//               return (
//                 item.date === format(value, "yyyy-MM-dd") && (
//                   <div className="event-notes">
//                     <div>EVENT: {item.title}</div>
//                     <div>
//                       TIME: {item.from} - {item.to}
//                     </div>
//                   </div>
//                 )
//               );
//             })}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default DisplayTime;
