import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import axios from "axios";
import moment from "moment";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import { parseISO } from "date-fns";
import { ServicesContext } from "../Axios/ServicesContext";

function CreateModal(props) {
  const {modal,setModal} = props
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
  const {  data, setData,error,setError,getId,icon, setIcon,update, setUpdate,setGetId} = useContext(ReferenceDataContext);
  const {create,updateEvent}=useContext(ServicesContext)
  console.log(getId)
  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });
  // console.log(filteredEvent[0].eventName)
  const handleInput = ()=>{
    return getId?{
      title: filteredEvent[0].eventName,
      date: filteredEvent[0].fromTime.slice(0, 10),
      from: filteredEvent[0].fromTime.slice(11, 16),
      to: filteredEvent[0].toTime.slice(11, 16),
    }:{ title: "", date: "", from: "", to: "" }
   }
  const [input ,setInput]=useState(handleInput())
  
  const UpdateItem=()=>{
    // console.log("kaveri")
    const editItem = {
      id: filteredEvent[0].id,
      eventName: input.title,
      fromTime: moment(
      input.date + "" +input.from,
        "YYYY-MM-DDTHH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss"),
      toTime: moment(input.date + "" +input.to, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY-MM-DDTHH:mm:ss"
      )
    }
    updateEvent(editItem)
    setIcon(false);
    // setModal(false)
      // setUpdate(!update);
      setGetId("")
  }
  const CreateEvent=()=>{
    const createItem = {
      id: uuid(),
      eventName: input.title,
      fromTime: moment(
        input.date + "" + input.from,
        "YYYY-MM-DDTHH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss"),
      toTime: moment(input.date + "" + input.to, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    };
    if (parseISO(createItem.fromTime) < new Date())
    {
      setError("Meeting does not allowed for past");
      // setModal(false)
    }
    // e.preventDefault();
    else{
     create(createItem)
    //  setModal(false)
     setInput("")
      // await axios.post("http://localhost:5169/appointments", createItem)
      // .catch((error)=>{
      //  setError(error.response.data);
      // })
    }

  }
  // const {input,setInput,data,setData} = props
  // console.log(moment(input.date + '' +input.to,'YYYY-MM-DDTHH:mm:ss').format("YYYY-MM-DDTHH:mm:ss"))
  const addInput =  (e) => {
    
  
   
    // getId &&(
    //   setInput({
    //     title: filteredEvent[0].eventName,
    //     date: filteredEvent[0].fromTime.slice(0, 10),
    //     from: filteredEvent[0].fromTime.slice(11, 16),
    //     to: filteredEvent[0].toTime.slice(11, 16),
    //   })
    // )
    
    getId ? (UpdateItem()):(CreateEvent())
    setModal(false);

    
     

    
    // setData([...data,post.data])
    
    
    // setData([input,...data]);

    // console.log(input);
    // setData()
  };
  const close = () =>{
    setModal(false)
    console.log(modal);
    setInput("")
    setGetId("")
  }
  return (
    <div>
      <div className="modal-content">
        <div className="add">NEW EVENT</div>
        <form onSubmit={addInput}>
          <div className="title">
            <div className="title-text">Title</div>
            <input
              type="text"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            ></input>
          </div>
          <div className="date">
            <div className="date-text">Date</div>
            <input
              type="date"
              value={input.date}
              onChange={(e) => setInput({ ...input, date: e.target.value })}
            ></input>
          </div>
          <div className="from-time">
            <div className="from-text">From</div>
            <input
              type="time"
              value={input.from}
              onChange={(e) => setInput({ ...input, from: e.target.value })}
            ></input>
          </div>
          <div className="to-time">
            <div className="to-text">To</div>
            <input
              type="time"
              value={input.to}
              onChange={(e) => setInput({ ...input, to: e.target.value })}
            ></input>
          </div>
        </form>
        <button className="primary-button" onClick={close}>
          Close
        </button>
        <button className="primary-button" onClick={addInput}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateModal;

// value={input.title} onChange={(e)=>setInput({...input,title:e.target.value})
