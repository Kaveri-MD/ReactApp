import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import moment from "moment";

function EventModal(props) {
  const { eventClick, getId } = props;
  const { data } = useContext(ReferenceDataContext);
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });
  // console.log(filteredEvent);
   const from = filteredEvent[0].fromTime.slice(11,13) % 12 === 0 ? 12 : filteredEvent[0].fromTime.slice(11,13)%12 ;
    const to =filteredEvent[0].toTime.slice(11,13) % 12 === 0 ? 12 : filteredEvent[0].toTime.slice(11,13) % 12;
    const fromMeridiem = filteredEvent[0].fromTime.slice(11,13) < 12 ? 'am' : 'pm' ;
    const toMeridiem = filteredEvent[0].toTime.slice(11,13) < 12 ? 'am' : 'pm' ;
  return (
    <div className="event-modal">
      <div className="modal-content">
      <div className="add">
        EVENT
        <FontAwesomeIcon
          className="xmark"
          icon={faXmark}
          onClick={eventClick}
        />
      </div>
      <div className="title">
        <div className="title-text">Title</div>
        <div style={{ color: "white" }}>: {filteredEvent[0].eventName}</div>
      </div>
      <div className="date">
        <div className="date-text">Date</div>
        <div style={{ color: "white" }}>
          :{" "}
          {moment(filteredEvent[0].fromTime.slice(0, 10), "YYYY-MM-DD").format(
            "DD-MM-YYYY"
          )}
        </div>
      </div>
      <div className="from-time">
        <div className="from-text">Time</div>
        <div style={{ color: "white" }}>
          :{" "}
          {from +
            filteredEvent[0].fromTime.slice(13, 16) +
            " " +
            fromMeridiem +
            " - " +
            to +
            filteredEvent[0].toTime.slice(13, 16) +
            " " +
            toMeridiem}
        </div>
      </div>

      {/* <form onSubmit={addInput}>
            <div className="title">
              <div>Title</div>
              <input type="text" value={input.title} onChange={(e)=>setInput({...input,title:e.target.value})}></input>
            </div>
            <div className="date">
              <div>Date</div>
              <input type="date" value={input.date} onChange={(e)=>setInput({...input,date:e.target.value})}></input>
            </div>
            <div className="from-time">
              <div>From</div>
              <input type='time' value={input.from} onChange={(e)=>setInput({...input,from:e.target.value})}></input>
            </div>
            <div className="to-time">
              <div>To</div>
              <input type='time' value={input.to} onChange={(e)=>setInput({...input,to:e.target.value})}></input>
            </div>
            </form>
            <button  className="primary-button" onClick={props.toggleModal}>Close</button>
            <button className="primary-button" onClick={addInput} >Save</button> */}
    </div>
    </div>
    
  );
}

export default EventModal;
