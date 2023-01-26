import React, { useContext,useEffect } from "react";
import { format, parseISO } from "date-fns";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import "../../styles/rightNavigation/agenda.scss";
import Modal from "react-modal";
import EventModal from "./EventModal";
import { ServicesContext } from "../Axios/ServicesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faEllipsis
} from "@fortawesome/free-solid-svg-icons";

function Agenda() {
  const { currentDate, data, event, setEvent, getId, setGetId,getDate } =
    useContext(ReferenceDataContext);
    const {getByDate}=useContext(ServicesContext)
  const handleEvent = (id) => {
    setGetId(id);
    setEvent(true);
    // console.log(getId)
    console.log(event);
  };
  useEffect(()=>{
    getByDate();
  },[currentDate])
  return (
    <div className="agenda">
      <div className="day-planner">Day Plan</div>
      {getDate ? (

      
        getDate.map((item) => {
          // console.log(parseISO(item.fromTime).getMinutes())
          const from =
            parseISO(item.fromTime).getHours() % 12 === 0
              ? 12
              : parseISO(item.fromTime).getHours() % 12;
          const to =
            parseISO(item.toTime).getHours() % 12 === 0
              ? 12
              : parseISO(item.toTime).getHours() % 12;
          const fromMeridiem = parseISO(item.fromTime).getHours() < 12 ? "am" : "pm";
          const toMeridiem = parseISO(item.toTime).getHours() < 12 ? "am" : "pm";
          return (
            format( parseISO(item.fromTime),"yyyy-MM-dd") ===
              format(currentDate, "yyyy-MM-dd") && (
              <div className="event-notes" onDoubleClick={()=>handleEvent(item.id)}>
                <FontAwesomeIcon icon={faEllipsis} className="event-icon" />
                <div className="title">
                  <div className="title-text">Event</div>
                  <div>: {item.eventName}</div>
                </div>
                <div className="from-time">
                  <div className="from-text">Time</div>
                  <div>
                    : {from + item.fromTime.slice(13, 16) + " " + fromMeridiem}{" "}
                    - {to + item.toTime.slice(13, 16) + " " + toMeridiem}
                  </div>
                </div>
              </div>
            )
          );
        })):
           <div className="event-notes">No event today</div> 
        
      }
      {event && (
          <Modal isOpen={event} ariaHideApp={false} className="modal">
            <EventModal />
          </Modal>
        )}

    </div>
  );
}

export default Agenda;
