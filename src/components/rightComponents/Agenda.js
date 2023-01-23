import React, { useContext,useEffect } from "react";
import { format } from "date-fns";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import "../../styles/rightNavigation/agenda.scss";
import Modal from "react-modal";
import EventModal from "./EventModal";
import { ServicesContext } from "../Axios/ServicesContext";

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
      <div className="day-planner">Day Planner</div>
      {getDate ? (

      
        getDate.map((item) => {
          const from =
            item.fromTime.slice(11, 13) % 12 === 0
              ? 12
              : item.fromTime.slice(11, 13) % 12;
          const to =
            item.toTime.slice(11, 13) % 12 === 0
              ? 12
              : item.toTime.slice(11, 13) % 12;
          const fromMeridiem = item.fromTime.slice(11, 13) < 12 ? "am" : "pm";
          const toMeridiem = item.toTime.slice(11, 13) < 12 ? "am" : "pm";
          return (
            item.fromTime.slice(0, 10) ===
              format(currentDate, "yyyy-MM-dd") && (
              <div className="event-notes" onDoubleClick={()=>handleEvent(item.id)}>
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
