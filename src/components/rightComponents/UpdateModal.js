import React,{useContext, useState} from 'react'
import moment from "moment"
import { ReferenceDataContext } from '../context/ReferenceDataContext';

function UpdateModal(props) {
  // const { input,setInput,data,setData} = useContext(ReferenceDataContext);
    const {Update,filteredEvent} = props
    const [edit,setEdit] =useState(filteredEvent)
    console.log(edit);
    // console.log(moment(filteredEvent[0].fromTime.slice(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY"))
    // const name = edit[0].eventName;
  return (
    <div className="modal-content" >
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
          </div>
  )
}

export default UpdateModal

// function UpdateModal(props) {
//   const { input,setInput,data,setData} = useContext(ReferenceDataContext);
//     const {Update,filteredEvent} = props
//     setInput({title:filteredEvent[0].eventName})
//     setInput({date:filteredEvent[0].fromTime.slice(0, 10)})
//     setInput({from:filteredEvent[0].fromTime.slice(11,16)})
//     setInput({to:filteredEvent[0].toTime.slice(11,16)})
//     // const [edit,setEdit] =useState(filteredEvent)
//     // console.log(edit);
//     // console.log(moment(filteredEvent[0].fromTime.slice(0, 10), "YYYY-MM-DD").format("DD-MM-YYYY"))
//     // const name = edit[0].eventName;
//   return (
//     <div className="modal-content" >
//             <div className="add">EVENT</div>
//             {/* <form >
//             <div className="title">
//               <div className='title-text'>Title</div>
//               <input type="text"value={input.title} onChange={(e)=>setInput({...input,title:e.target.value})}></input>
//             </div>
//             <div className="date">
//               <div  className='date-text'>Date</div>
//               <input type="date" value={input.date} onChange={(e)=>setInput({...input,date:e.target.value})}></input>
//             </div>
//             <div className="from-time">
//               <div  className='from-text'>From</div>
//               <input type='time' value={input.from} onChange={(e)=>setInput({...input,from:e.target.value})}></input>
//             </div>
//             <div className="to-time">
//               <div  className='to-text'>To</div>
//               <input type='time' value={input.to} onChange={(e)=>setInput({...input,to:e.target.value})}></input>
//             </div>
//             </form> */}
//             <button  className="primary-button" onClick={Update}>Close</button>
//             <button className="primary-button" onClick={Update}>Save</button>
//           </div>
//   )
// }

// export default UpdateModal