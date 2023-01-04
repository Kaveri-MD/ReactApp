import {useState} from 'react'
import {sub,add} from "date-fns";


function useMonth() {
    const [currentDate,setCurrentDate] = useState(new Date());
    const value = currentDate;
    const onChange = setCurrentDate;
    const prevMonth=() =>{
        onChange(sub(value,{months:1}));
    }
    const nextMonth=() =>{
        onChange(add(value,{months:1}));
    }
    return[prevMonth,nextMonth,value,onChange];
}

export default useMonth