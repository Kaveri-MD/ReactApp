import React, { useContext } from "react";
import Calendar from "../Calendar/Calendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "../../styles/leftNavigation/leftNavigation.scss";
import Modal from "react-modal";
import CreateModal from "./CreateModal";
import { ReferenceDataContext } from "../context/ReferenceDataContext";

function LeftNavigation() {
  const { modal, setModal,setAngle, setMonthAngle } = useContext(ReferenceDataContext);

  const toggleModal = () => {
    setModal(!modal);
    console.log(modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const closePopUp=()=>{
    setAngle(false)
    setMonthAngle(false)

  }

  return (
    <div className="left-navigation" onClick={closePopUp}>
      <button onClick={toggleModal} className="create">
        <FontAwesomeIcon className="plus" icon={faPlus} />
        Create
      </button>
      <Calendar />

      {modal && (
        <Modal isOpen={modal} ariaHideApp={false} className="modal">
          <CreateModal modal={modal} setModal={setModal} />
        </Modal>
      )}
    </div>
  );
}

export default LeftNavigation;
