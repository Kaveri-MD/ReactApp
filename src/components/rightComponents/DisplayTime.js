import React, { useContext, useEffect } from "react";
import { ListItem } from "../../lists/List";
import { format, subDays, addDays, parseISO } from "date-fns";
import moment from "moment";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faAngleLeft,
  faAngleRight,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
// import { faCircle } from "@fortawesome/free-regular-svg-icons";
import EllipsisMenu from "./EllipsisMenu";
import { RightNavContext } from "../context/RightNavContext";
import Agenda from "./Agenda";
import "../../styles/rightNavigation/displayTime.scss";
import { ServicesContext } from "../Axios/ServicesContext";

function DisplayTime() {
  const {
    currentDate,
    setCurrentDate,
    data,
    getId,
    setGetId,
    getDate,
    setGetDate,
  } = useContext(ReferenceDataContext);
  const { icon, setIcon } = useContext(RightNavContext);
  const { getByDate } = useContext(ServicesContext);

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
  useEffect(() => {
    getByDate();
  }, [currentDate]);

  const now = new Date();
  const nowMins = (now.getMinutes() / 60) * 50;
  const nowTop = 50 * now.getHours() + nowMins;
  // console.log(moment(now).format("yyyy-MM-DD"));
  return (
    <div className="display-time">
      <div className="time-chart">
        <div className="day">
          <div className="day-angle">
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="calendar-day"
              onClick={prevDay}
            />
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
          {/* {console.log(currentDate, "hi")} */}
          {/* {console.log(new Date(), "hi1")} */}

          {format(currentDate, "yyyy-MM-dd") === format(now, "yyyy-MM-dd") && (
            <div className="current-time-line" style={{ top: nowTop }}>
              <div className="circle-icon">
                <FontAwesomeIcon icon={faCircle} />
              </div>
              <div className="current-time"></div>
            </div>
          )}

          {getDate &&
            getDate.map((item) => {
              const minutes = moment(item.toTime.slice(11, 16), "hh:mm").diff(
                moment(item.fromTime.slice(11, 16), "hh:mm"),
                "minutes"
                );
                // const startTime = parseISO(item.fromTime).getHours();
                const startMinute = (parseISO(item.fromTime).getMinutes() / 60) * 50.8;
                
                const setHeight = (minutes / 60) * 50.8;
                
                const setTop = 50.8 * parseISO(item.fromTime).getHours() + startMinute;
                
                return (
                  format(parseISO(item.fromTime),"yyyy-MM-dd")===
                  format(currentDate, "yyyy-MM-dd") && (
                    <div
                    className={setHeight > 16 ?"display-eventbar":"hover-event"}
                    style={{ height: setHeight , top: setTop }}
                    >
                    {/* {console.log(format(parseISO(item.fromTime),"yyyy-MM-dd"))} */}
                    <div className={setHeight > 16 ?"event-name":"display-none"}>
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
        <Agenda />
      </div>
    </div>
  );
}
export default DisplayTime;
