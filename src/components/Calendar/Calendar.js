import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  format,
  setDate,
} from "date-fns";
import "../../styles/calendar.scss";
import Cell from "./Cell";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import axios from "axios";
import Modal from "react-modal";
import EventModal from "./EventModal";

function Calendar() {
  const {
    data,
    setData,
    currentDate,
    setCurrentDate,
    prevMonth,
    nextMonth,
    getId,
    setGetId,
  } = useContext(ReferenceDataContext);

  useEffect(() => {
    axios.get("http://localhost:5169/appointments").then((response) => {
      setData(response.data);
    });
  }, []);

  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDate = startDate.getDay();
  const suffixDate = 6 - endDate.getDay();

  const selectedDate = (index) => {
    const date = setDate(currentDate, index);
    setCurrentDate(date);
    console.log(currentDate, "date");
  };
  const [event, setEvent] = useState(false);

  const eventClick = (id) => {
    setGetId(id);
    setEvent(!event);
  };

  return (
    <div>
      <div className="calendar-container">
        <div className="calendar-angle" onClick={() => prevMonth()}>
          <Cell>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Cell>
        </div>
        <div className="calendar-month">
          <Cell>{format(currentDate, "LLLL yyyy")}</Cell>
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
          const isCurrentDate = date === currentDate.getDate();

          return (
            <div className="calendar-item" onClick={() => selectedDate(date)}>
              <Cell key={date} isActive={isCurrentDate}>
                <div className="display-date">{date}</div>
              </Cell>
              <Cell>
                {data &&
                  data.map((item) => {
                    return (
                      item.fromTime.slice(0, 10) ===
                        format(setDate(currentDate, date), "yyyy-MM-dd") && (
                          // <div className="event-container">
                             <div
                          className="display-event"
                          onClick={() => {
                            eventClick(item.id);
                          }}
                        >
                          {item.eventName}
                        </div>

                       
                    // </div>
                      )
                         
                    );
                  })}
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
