import React, { useState, useContext } from "react";
import moment from "moment";
import Modal from "react-modal";
import DeleteModal from "./DeleteModal";
import CreateModal from "../leftComponents/CreateModal";
import UpdateModal from "./UpdateModal";
// import CreateModal from "./CreateModal";
// import { ReferenceDataContext } from "../context/ReferenceDataContext";

function EllipsisMenu(props) {
  // const {modal,setModal, toggleModal } = useContext(ReferenceDataContext);
  const [popup, setPopup] = useState(false);
  const [update, setUpdate] = useState(false);
  const { icon, setIcon, filteredEvent } = props;
  const Delete = () => {
    setIcon(false);
    setPopup(!popup);
  };
  const Update = () => {
    setIcon(false);
    setUpdate(!update);
  };
  return (
    <div>
      <div className="edit" onClick={Update}>
        Edit
      </div>
      <div className="delete" onClick={Delete}>
        Delete
      </div>
      {popup && (
        <Modal isOpen={popup} ariaHideApp={false} className="modal">
          <DeleteModal
            Delete={Delete}
            filteredEvent={filteredEvent}
            popup={popup}
            setPopup={setPopup}
            setIcon={setIcon}
          />
        </Modal>
      )}
      {update && (
        <Modal isOpen={update} ariaHideApp={false} className="modal">
          <UpdateModal
            Update={Update}
            filteredEvent={filteredEvent}
            update={update}
            setUpdate={setUpdate}
            setIcon={setIcon}
          />
        </Modal>
      )}
    </div>
  );
}

export default EllipsisMenu;
