import React from 'react'
import axios from "axios";

function DeleteModal(props) {
    const {Delete,filteredEvent,setIcon,popup,setPopup} = props
    const DeleteItem=()=>{
      axios
        .delete(`http://localhost:5169/appointments/event/${filteredEvent[0].id}`)
        .then(() => {
          alert("Post deleted!");
        });

        setIcon(false)
        setPopup(!popup)

    }
  return (
    <div className='delete-modal'>

    <div className="modal-content">
        <div className="add">Do you want to delete ?</div>
        <div className='delete-button'> 
            <button  className="primary-button" onClick={Delete}>No</button>
            <button className="primary-button" onClick={DeleteItem}>Yes</button>
        </div>
    </div>
    </div>
  )
}

export default DeleteModal