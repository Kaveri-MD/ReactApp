import React, { useContext, useEffect } from "react";
import { ListItem } from "../../lists/List";
import { format, subDays, addDays } from "date-fns";
import moment from "moment";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import EllipsisMenu from "./EllipsisMenu";
import { RightNavContext } from "../context/RightNavContext";
import Agenda from "./Agenda";
import "../../styles/rightNavigation/displayTime.scss"
import { ServicesContext } from "../Axios/ServicesContext";

function DisplayTime() {
  const { currentDate, setCurrentDate, data, getId, setGetId,getDate,setGetDate } =
    useContext(ReferenceDataContext);
  const { icon, setIcon } = useContext(RightNavContext);
  const {getByDate}=useContext(ServicesContext)

  const DotClick = (id) => {
    setIcon(!icon);
    setGetId(id);
  };

  const prevDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };
  const nextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };
  useEffect(()=>{
    getByDate();
  },[currentDate])
  return (
    <div className="display-time" >
      <div className="time-chart">
        <div className="day">
          <div className="day-angle">
              <FontAwesomeIcon icon={faAngleLeft}  className="calendar-day" onClick={prevDay} />
            <div className="day-date">
              <div>{format(currentDate, "EEEE")}</div>
              <div>{format(currentDate, "d")}</div>
            </div>
              <FontAwesomeIcon
                icon={faAngleRight}
                className="calendar-day"
                onClick={nextDay}
              />
          </div>
        </div>

        <div className="grid-container">
          {ListItem.map((item) => (
            <div className="grid-item">{item.time}</div>
          ))}
        </div>
        <div className="row">
          {ListItem.map((item) => (
            <div className="horizontal-bar"></div>
          ))}
          {getDate &&
            getDate.map((item) => {
              const minutes = moment(item.toTime.slice(11, 16), "hh:mm").diff(
                moment(item.fromTime.slice(11, 16), "hh:mm"),
                "minutes"
              );
              const startTime = moment.duration(
                item.fromTime.slice(11, 16),
                "hours"
              );
              const startMinute = (startTime.minutes() / 60) * 50;

              const setHeight = (minutes / 60) * 51;

              const setTop = 50.8 * startTime.hours() + startMinute;

              return (
                item.fromTime.slice(0, 10) ===
                  format(currentDate, "yyyy-MM-dd") && (
                  <div
                    className="display-eventbar"
                    style={{ height: setHeight, top: setTop }}
                  >
                    <div className="event-name">
                      {item.eventName}
                      <FontAwesomeIcon
                        className="dot-icon"
                        icon={faEllipsisVertical}
                        onClick={() => {
                          DotClick(item.id);
                        }}
                      />
                      {item.id === getId && (
                        <div className={icon ? "menu" : "menu-inactive"}>
                          <EllipsisMenu />
                        </div>
                      )}
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
      <div>
        <Agenda/>
      </div>

    </div>
  );
}
export default DisplayTime;
