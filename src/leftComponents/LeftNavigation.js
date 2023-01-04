import React, { useState } from "react";
import Calendar from "../components/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../styles/leftNavigation.scss";
import Modal from "react-modal"
import Draggable from 'react-draggable';

function LeftNavigation(props) {
  const prevMonth = props.prevMonth;
  const nextMonth = props.nextMonth;

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div className={props.display ? "left-navigation" : "left-iconclick"}>
      <button onClick={toggleModal} className="create">
        <FontAwesomeIcon className="plus" icon={faPlus} />
        Create
      </button>
      <Calendar
        value={props.value}
        onChange={props.onChange}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      
      
      {modal && <Modal isOpen={true} className="modal">
      
          <div className=""></div>
          <div className="modal-content">
            <div className="add">ADD EVENT</div>
            <div className="title">
              <div>Title :</div>
              <input type="text"></input>
            </div>
            <div className="date">
              <div>Date :</div>
              <input type="date"></input>
            </div>
            <div className="from-time">
              <div>From</div>
              <input type='time'></input>
            </div>
            <div className="to-time">
              <div>To</div>
              <input type='time'></input>
            </div>
            <button className="primary-button" onClick={toggleModal}>Save</button>
            <button  className="primary-button" onClick={toggleModal}>Close</button>
          </div>
         
      </Modal> }
      


      {/* {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <div>ADD EVENT</div>
            <div className="title">
              <div>Title</div>
              <input type="text"></input>
            </div>
            <div className="date">
              <div>Date</div>
              <input type="date"></input>
            </div>
            <div className="from-time">
              <div>From</div>
              <input type='time'></input>
            </div>
            <div className="to-time">
              <div>To</div>
              <input type='time'></input>
            </div>
            <button onClick={toggleModal}>Save</button>
            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )} */}
    </div>
  );
}

export default LeftNavigation;
