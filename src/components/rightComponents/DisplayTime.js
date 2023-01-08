import React, { useContext } from "react";
import { ListItem } from "../../lists/List";
import { format, set, setDate } from "date-fns";
import { Link } from "react-router-dom";
import moment from "moment";
import { ReferenceDataContext } from "../context/ReferenceDataContext";

function DisplayTime() {
  const { value, data } = useContext(ReferenceDataContext);

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
              const minutes = moment(item.to, "hh:mm").diff(
                moment(item.from, "hh:mm"),
                "minutes"
              );
              const startTime = moment.duration(item.from, "hours");
              const startMinute = (startTime.minutes() / 60) * 50;
              console.log(startTime.hours(), "hr");
              console.log(startMinute, "minute");
              console.log(minutes, "min");
              // console.log(moment(item.to, "hh:mm"));
              // console.log(hour + min.minutes());
              const setHeight = (minutes / 60) * 51;
              console.log(setHeight, "height");
              const setTop = 94 + (51 * startTime.hours() + startMinute);
              console.log(setTop - 94, "top");

              return (
                item.date === format(value, "yyyy-MM-dd") && (
                  <div
                    className="display-eventbar"
                    style={{ height: setHeight, top: setTop }}
                  >
                    {item.title}
                  </div>
                )
              );
            })}
        </div>
        <div className="agenda">
          {data &&
            data.map((item) => {
              return (
                item.date === format(value, "yyyy-MM-dd") && (
                  <div className="event-notes">
                    <div>EVENT: {item.title}</div>
                    <div>
                      TIME: {item.from} - {item.to}
                    </div>
                  </div>
                )
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default DisplayTime;
