import React, { useState, useContext } from "react";
import moment from "moment";
import Modal from "react-modal";
import DeleteModal from "./DeleteModal";
import CreateModal from "../leftComponents/CreateModal";
import UpdateModal from "./UpdateModal";
// import CreateModal from "./CreateModal";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { RightNavContext } from "../context/RightNavContext";

function EllipsisMenu(props) {
  const {modal,setModal, toggleModal  } = useContext(ReferenceDataContext);
  const {icon, setIcon,update, setUpdate,popup, setPopup ,Delete} = useContext(RightNavContext)
  // const [popup, setPopup] = useState(false);
  // const [update, setUpdate] = useState(false);
  // const { filteredEvent } = props;
  // const Delete = () => {
  //   setIcon(false);
  //   setPopup(!popup);
  // };
  const Update = () => {
    setIcon(false);
    // setUpdate(!update);
    setModal(true);
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
          />
        </Modal>
      )}
      {/* {update && (
        <Modal isOpen={update} ariaHideApp={false} className="modal">
          <UpdateModal
            
          />
        </Modal>
      )} */}
    </div>
  );
}

export default EllipsisMenu;
