import React, { useContext } from "react";
import Modal from "react-modal";
import DeleteModal from "./DeleteModal";

import { RightNavContext } from "../context/RightNavContext";
import "../../styles/rightNavigation/ellipsisMenu.scss";

function EllipsisMenu() {
  const { popup, Delete, Update } = useContext(RightNavContext);

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
          <DeleteModal />
        </Modal>
      )}
    </div>
  );
}

export default EllipsisMenu;
