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

import {useState,createContext} from 'react'
import {sub,add} from "date-fns";

const ReferenceDataContext = createContext();
    

const ReferenceDataContextProvider = ({children}) => {
  
    const [currentDate,setCurrentDate] = useState(new Date());
    const [input,setInput] = useState({title:"",date:"",from:"",to:""});
    const [data,setData] = useState([]);
    const [display, setDisplay] = useState(true);
    
    const view = ()=>{
      setDisplay(!display)
    }
    const value = currentDate;
    const onChange = setCurrentDate;
    console.log(onChange);
    const prevMonth=() =>{
        onChange(sub(value,{months:1}));
    }
    const nextMonth=() =>{
        onChange(add(value,{months:1}));
    }
    return (
        <ReferenceDataContext.Provider value={{ value,onchange,prevMonth,nextMonth,input,setInput,data,setData,display,view}}>
          {children}
        </ReferenceDataContext.Provider>
      );
}

export { ReferenceDataContext, ReferenceDataContextProvider };