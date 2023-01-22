// import {useState} from 'react'
// import {sub,add} from "date-fns";

// function useMonth() {
//     const [currentDate,setCurrentDate] = useState(new Date());
//     const value = currentDate;
//     const onChange = setCurrentDate;
//     const prevMonth=() =>{
//         onChange(sub(value,{months:1}));
//     }
//     const nextMonth=() =>{
//         onChange(add(value,{months:1}));
//     }
//     return[prevMonth,nextMonth,value,onChange];
// }

// export default useMonth

import { useState, createContext } from "react";
import { sub, add } from "date-fns";
// import axios from "axios";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [getId, setGetId] = useState();
  // console.log(getId)
  // console.log( filteredEvent )
  // console.log(filteredEvent.eventName,"get");

  const [display, setDisplay] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [input, setInput] = useState();
  // const [input ,setInput]=useState({
  //   title: filteredEvent.eventName,
  //   date: "",
  //   from:"",
  //   to: "",
  // })
  const [select, setSelect] = useState([]);
  const [day,setDay]=useState(false);
  const [error,setError]=useState("");
  const[errorPopUp,setErrorPopUp]=useState(true)
  const [modal, setModal] = useState(false);

  // const [modal, setModal] = useState(false);

  // const [getData,setGetData] =useState([]);

  const view = () => {
    setDisplay(!display);
  };
  // const value = currentDate;
  // const onChange = setCurrentDate;
  // console.log(setCurrentDate);
  const prevMonth = () => {
    setCurrentDate(sub(currentDate , { months: 1 }));
  };
  const nextMonth = () => {
    setCurrentDate(add(currentDate , { months: 1 }));
  };
  // const Update = () => {
  //   setIcon(false);
  //   setUpdate(!update);
  // };

  // const toggleModal = () => {
  //   setModal(!modal);
  //   console.log(modal);
  // };

  // axios.get("http://localhost:5169/appointments").then((response) => {
  //   // handle success
  //   // console.log(response.data);
  //   setData(response.data);
  // });

  return (
    <ReferenceDataContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        prevMonth,
        nextMonth,
        data,
        setData,
        display,
        view,
        getId,
        setGetId,
        select, 
        setSelect,day,setDay,error,setError,errorPopUp,setErrorPopUp,modal, setModal
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
