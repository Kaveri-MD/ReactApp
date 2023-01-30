import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  format,
  setDate,
  subDays,
  parseISO
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
    setError,
    setErrorPopUp,
    passedTime,
    getDate,filteredData, setFilteredData
  } = useContext(ReferenceDataContext);

  const { getAll, getByDate } = useContext(ServicesContext);

  // const [filteredData, setFilteredData] = useState(false);

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
  const createModal = (index) => {
    const date = setDate(currentDate, index);
    date < subDays(new Date(), 1)
      ? setError("Event can't be created - Time has passed")
      : setModal(true);
    // console.log(date)
  };
  const handleDropDown = () => {
    setFilteredData(!filteredData)
    getByDate();
    console.log(getDate, "hi");
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
          {/* <FontAwesomeIcon icon={faAngleDown}/> */}
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
          const getData = data.filter((item) => {
            console.log()
            return (
              format(parseISO(item.fromTime),"yyyy-MM-dd") ===
              format(setDate(currentDate, date), "yyyy-MM-dd")
            );
          });

          return (
            <div
              className="calendar-item"
              onClick={() => selectedDate(date)}
              onDoubleClick={() => createModal(date)}
            >
              <Cell key={date} isActive={isCurrentDate}>
                <div>{date}</div>
              </Cell>
              <Cell>
                {getData &&
                  getData.slice(0, 1).map((item) => {
                    return (
                      <div>
                        <div
                          className="display-event"
                          onClick={handleDropDown}
                        >
                          {item.eventName}
                          {getData.length > 1 && (
                            <FontAwesomeIcon
                              className="drop-icon"
                              icon={faAngleDown}
                            />
                          )}
                        </div>
                        <div
                          className={
                            getDate && filteredData ? "dropdown-content" : "display-none"
                          }
                        >
                          {(getDate && filteredData ) &&
                            getDate.map((item) => {
                              return (
                                format(parseISO(item.fromTime),"yyyy-MM-dd") ===
                                  format(
                                    setDate(currentDate, date),
                                    "yyyy-MM-dd"
                                  ) && (
                                  <div className="hover-display-event">
                                    {item.eventName}
                                  </div>
                                )
                              );
                            })}
                        </div>
                      </div>
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
      </div>
    </div>
  );
}

export default Calendar;
