import React, { useEffect } from 'react'
import {useState} from 'react'

function CreateModal(props) {

  // const[input,setInput,data,setData] = useCreateEvent();
  // const [input,setInput] = useState({title:"",date:"",from:"",to:""});
  // const [title,setTitle] = useState("");
  // const [date,setDate] = useState("");
  // const [from,setFrom] = useState("");
  // const [to,setTo] = useState("");
  // const [data,setData] = useState([]);
  
  // useEffect(()=>{
  //   addInput()
  // },[])

  const {input,setInput,data,setData} = props
  const addInput=(e)=>{
    // e.preventDefault();
    
    setData([...data,input])
    console.log(data);
    props.toggleModal();
    setInput("")
    // setData([input,...data]);
 
    // console.log(input);
  }
  return (
    <div>
        <div className=""></div>
          <div className="modal-content" >
            <div className="add">ADD EVENT</div>
            <form onSubmit={addInput}>
            <div className="title">
              <div>Title</div>
              <input type="text" value={input.title} onChange={(e)=>setInput({...input,title:e.target.value})}></input>
            </div>
            <div className="date">
              <div>Date</div>
              <input type="date" value={input.date} onChange={(e)=>setInput({...input,date:e.target.value})}></input>
            </div>
            <div className="from-time">
              <div>From</div>
              <input type='time' value={input.from} onChange={(e)=>setInput({...input,from:e.target.value})}></input>
            </div>
            <div className="to-time">
              <div>To</div>
              <input type='time' value={input.to} onChange={(e)=>setInput({...input,to:e.target.value})}></input>
            </div>
            </form>
            <button  className="primary-button" onClick={props.toggleModal}>Close</button>
            <button className="primary-button" onClick={addInput} >Save</button>
          </div>
    </div>
  )
}

export default CreateModal

// value={input.title} onChange={(e)=>setInput({...input,title:e.target.value})