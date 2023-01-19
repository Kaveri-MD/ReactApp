import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import axios from "axios";
import moment from "moment";
import { faUserInjured } from "@fortawesome/free-solid-svg-icons";
import uuid from "react-uuid";
import { parseISO } from "date-fns";

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
  const { input, setInput, data, setData,error,setError } = useContext(ReferenceDataContext);
  
  // const {input,setInput,data,setData} = props
  // console.log(moment(input.date + '' +input.to,'YYYY-MM-DDTHH:mm:ss').format("YYYY-MM-DDTHH:mm:ss"))
  const addInput = async (e) => {
    console.log(input.title);
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
      props.toggleModal();
    }
    // e.preventDefault();
    else{

      await axios.post("http://localhost:5169/appointments", createItem)
      .catch((error)=>{
       setError(error.response.data);
      })
    }

    
     

    
    // setData([...data,post.data])
    
    props.toggleModal();
    setInput("");
    // setData([input,...data]);

    // console.log(input);
    // setData()
  };
  const Close = () =>{
    props.toggleModal();
    setInput("")
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
        <button className="primary-button" onClick={Close}>
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
