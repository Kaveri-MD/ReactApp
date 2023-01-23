import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark ,faTrashCan,faPencil} from "@fortawesome/free-solid-svg-icons";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import moment from "moment";
import "../../styles/calendar/eventModal.scss"
import { RightNavContext } from "../context/RightNavContext";
import Modal from "react-modal";
import DeleteModal from "./DeleteModal";

function EventModal() {

  const { data,getId,setGetId,setEvent } = useContext(ReferenceDataContext);
  const {Delete,Update} = useContext(RightNavContext);
  

  const closeEvent = () => {
    setEvent(false);
    setGetId("")
  };
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });
  const from =
    filteredEvent[0].fromTime.slice(11, 13) % 12 === 0
      ? 12
      : filteredEvent[0].fromTime.slice(11, 13) % 12;
  const to =
    filteredEvent[0].toTime.slice(11, 13) % 12 === 0
      ? 12
      : filteredEvent[0].toTime.slice(11, 13) % 12;
  const fromMeridiem =
    filteredEvent[0].fromTime.slice(11, 13) < 12 ? "am" : "pm";
  const toMeridiem = filteredEvent[0].toTime.slice(11, 13) < 12 ? "am" : "pm";
  return (
    <div className="event-modal">
      <div className="modal-content">
        <div className="add">
          EVENT
          <FontAwesomeIcon
            className="xmark"
            icon={faXmark}
            onClick={closeEvent}
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
            {moment(
              filteredEvent[0].fromTime.slice(0, 10),
              "YYYY-MM-DD"
            ).format("DD-MM-YYYY")}
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
        <div className="icons">
          <FontAwesomeIcon icon={faPencil} className="edit-icon"  onClick={Update}/>       
          <FontAwesomeIcon icon={faTrashCan} className="trash-icon" onClick={Delete}/>
        </div>
      </div>
      {/* {isDelete && (
        <Modal isOpen={isDelete} ariaHideApp={false} className="modal">
          <DeleteModal />
        </Modal>
      )} */}

    </div>
  );
}

export default EventModal;
