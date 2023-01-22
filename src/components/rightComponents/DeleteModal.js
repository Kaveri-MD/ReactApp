import React, { useContext } from "react";
import axios from "axios";
import { ServicesContext } from "../Axios/ServicesContext";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { RightNavContext } from "../context/RightNavContext";

function DeleteModal(props) {
  const {deleteEvent}=useContext(ServicesContext)
  const {getId,setGetId ,data}=useContext(ReferenceDataContext)
  const {setIcon,Delete}=useContext(RightNavContext)
  // const { Delete, popup, setPopup,data,getId ,filteredEvent} = props;
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });
  console.log(data)

  const DeleteItem = () => {
    // axios
    //   .delete(`http://localhost:5169/appointments/event/${filteredEvent[0].id}`)
    deleteEvent(filteredEvent[0].id)  
    Delete();
    setGetId("")
  };
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <div className="add">Do you want to delete ?</div>
        <div className="delete-button">
          <button className="primary-button" onClick={Delete}>
            No
          </button>
          <button className="primary-button" onClick={DeleteItem}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
