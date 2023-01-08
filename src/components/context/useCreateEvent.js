import React ,{useState} from 'react'

function useCreateEvent() {
    const [input,setInput] = useState({title:"",date:"",from:"",to:""});
    const [data,setData] = useState([]);
    return[input,setInput,data,setData];
}

export default useCreateEvent