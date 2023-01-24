import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  format,
  setDate,
  subDays,
} from "date-fns";
import "../../styles/calendar/calendar.scss";
import Cell from "./Cell";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { ServicesContext } from "../Axios/ServicesContext";
import Modal from "react-modal";
import EventModal from "../rightComponents/EventModal";


function Calendar() {
  const {
    data,
    currentDate,
    setCurrentDate,
    prevMonth,
    nextMonth,
    setGetId,
    setModal,
    event, 
    setEvent,
    setError,setErrorPopUp
  } = useContext(ReferenceDataContext);

  const { getAll } = useContext(ServicesContext);
  useEffect(() => {
    getAll();
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
    // console.log(currentDate, "date");

  };


  const eventClick = (id) => {
    setGetId(id);
    setEvent(true);
  };
  const createModal=(index)=>{
    const date = setDate(currentDate, index)
    date < subDays(new Date(),1)  ? setError("Event can't be created - Time has passed") : setModal(true)
    // console.log(date)
  }

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
            <div className="calendar-item" onClick={() => selectedDate(date)} onDoubleClick={()=>createModal(date)}>
              <Cell key={date} isActive={isCurrentDate}>
                <div>{date}</div>
              </Cell>
              <div className="scroll-event">
                {data &&
                  data.map((item) => {
                    return (
                      item.fromTime.slice(0, 10) ===
                        format(setDate(currentDate, date), "yyyy-MM-dd") && (
                        <div
                          className="display-event"
                        >
                          <Cell>{item.eventName}</Cell>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          );
        })}
        {Array.from({ length: suffixDate }).map((date, index) => (
          <div className="calendar-item">
            <Cell></Cell>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Calendar;
