import React, { useContext, useState } from "react";
import moment from "moment";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { ServicesContext } from "../Axios/ServicesContext";
import CreateModal from "../leftComponents/CreateModal";

function UpdateModal(props) {
  // const { setError} = useContext(ReferenceDataContext);
  // const {updateEvent}=useContext(ServicesContext)
  // const { Update, filteredEvent, setIcon, update, setUpdate ,} = props;
  // const [edit, setEdit] = useState({
  //   title: filteredEvent[0].eventName,
  //   date: filteredEvent[0].fromTime.slice(0, 10),
  //   from: filteredEvent[0].fromTime.slice(11, 16),
  //   to: filteredEvent[0].toTime.slice(11, 16),
  // });
  // console.log(filteredEvent[0].eventName);
  // const UpdateItem = async() => {
  //   // try{}
  //   const editItem = {
  //     id: filteredEvent[0].id,
  //     eventName: edit.title,
  //     fromTime: moment(
  //       edit.date + "" + edit.from,
  //       "YYYY-MM-DDTHH:mm:ss"
  //     ).format("YYYY-MM-DDTHH:mm:ss"),
  //     toTime: moment(edit.date + "" + edit.to, "YYYY-MM-DDTHH:mm:ss").format(
  //       "YYYY-MM-DDTHH:mm:ss"
  //     ),
  //   };
  //   updateEvent(editItem);
  //   // await axios.put(`http://localhost:5169/appointments`, editItem)
  //   // .catch((error)=>{
  //   //   // console.log(error.response.data);
  //   //  setError(error.response.data)
     
  //   //  })

  //   setIcon(false);
  //   setUpdate(!update);
  // };
  // console.log(moment(filteredEvent[0].fromTime.slice(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY"))
  // const name = edit[0].eventName;
  return (
    // <div className="modal-content">
    //   <div className="add">EVENT</div>
    //   <form>
    //     <div className="title">
    //       <div className="title-text">Title</div>
    //       <input
    //         type="text"
    //         value={edit.title}
    //         onChange={(e) => setEdit({ ...edit, title: e.target.value })}
    //       ></input>
    //     </div>
    //     <div className="date">
    //       <div className="date-text">Date</div>
    //       <input
    //         type="date"
    //         value={edit.date}
    //         onChange={(e) => setEdit({ ...edit, date: e.target.value })}
    //       ></input>
    //     </div>
    //     <div className="from-time">
    //       <div className="from-text">From</div>
    //       <input
    //         type="time"
    //         value={edit.from}
    //         onChange={(e) => setEdit({ ...edit, from: e.target.value })}
    //       ></input>
    //     </div>
    //     <div className="to-time">
    //       <div className="to-text">To</div>
    //       <input
    //         type="time"
    //         value={edit.to}
    //         onChange={(e) => setEdit({ ...edit, to: e.target.value })}
    //       ></input>
    //     </div>
    //   </form>
    //   <button className="primary-button" onClick={Update}>
    //     Close
    //   </button>
    //   <button className="primary-button" onClick={UpdateItem}>
    //     Save
    //   </button>
    // </div>
    <div>
      <CreateModal/>
    </div>
  );
}

export default UpdateModal;

{
  /* <div className="modal-content" >
            <div className="add">EVENT</div>
            <form >
            <div className="title">
              <div className='title-text'>Title</div>
              <input type="text" value={edit[0].eventName} onChange={(e)=>setEdit({...edit,eventName:e.target.value})}></input>
            </div>
            <div className="date">
              <div  className='date-text'>Date</div>
              <input type="date" value={edit[0].fromTime.slice(0, 10)} onChange={(e)=>setEdit({...edit,fromTime:e.target.value})}></input>
            </div>
            <div className="from-time">
              <div  className='from-text'>From</div>
              <input type='time' value={edit[0].fromTime.slice(11,16)} onChange={(e)=>setEdit({...edit,from:e.target.value})}></input>
            </div>
            <div className="to-time">
              <div  className='to-text'>To</div>
              <input type='time' value={edit[0].toTime.slice(11,16)} onChange={(e)=>setEdit({...edit,to:e.target.value})}></input>
            </div>
            </form>
            <button  className="primary-button" onClick={Update}>Close</button>
            <button className="primary-button" onClick={Update}>Save</button>
          </div> */
}
