import React, { useContext } from "react";
import { ServicesContext } from "../Axios/ServicesContext";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { RightNavContext } from "../context/RightNavContext";
import "../../styles/rightNavigation/deleteModal.scss";

function DeleteModal(props) {
  const { deleteEvent } = useContext(ServicesContext);
  const { getId, setGetId, data } = useContext(ReferenceDataContext);
  const { Delete, setPopup } = useContext(RightNavContext);
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });
  console.log(data);

  const remain = () => {
    setPopup(false);
    setGetId("");
  };

  const DeleteItem = () => {
    deleteEvent(filteredEvent[0].id);
    Delete();
    setGetId("");
  };
  return (
    <div className="delete-modal">
      <div className="modal-content">
        <div className="add">Do you want to delete ?</div>
        <div className="delete-button">
          <button className="primary-button" onClick={remain}>
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
