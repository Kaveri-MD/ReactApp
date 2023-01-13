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
import axios from "axios";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
  const [display, setDisplay] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [input, setInput] = useState({ title: "", date: "", from: "", to: "" });
  const [data, setData] = useState([]);
  const [getId, setGetId] = useState();
  const [select, setSelect] = useState([]);
  // const [modal, setModal] = useState(false);

  // const [getData,setGetData] =useState([]);

  const view = () => {
    setDisplay(!display);
  };
  const value = currentDate;
  // const onChange = setCurrentDate;
  // console.log(setCurrentDate);
  const prevMonth = () => {
    setCurrentDate(sub(value, { months: 1 }));
  };
  const nextMonth = () => {
    setCurrentDate(add(value, { months: 1 }));
  };

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
        value,
        setCurrentDate,
        prevMonth,
        nextMonth,
        input,
        setInput,
        data,
        setData,
        display,
        view,
        getId,
        setGetId,
        select, 
        setSelect
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
