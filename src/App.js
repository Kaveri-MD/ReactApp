import React ,{useState}from "react";
import "./App.css";
import "./styles/styles.scss";
import {sub,add} from "date-fns";
import LeftNavigation from "./components/leftComponents/LeftNavigation";
import RightNavigation from "./components/rightComponents/RightNavigation";
import Header from "./components/Header";
import useMonth from "../src/components/Hooks/useMonth"
import useCreateEvent from '../src/components/Hooks/useCreateEvent';


function App() {
  const [display, setDisplay] = useState(true);
  const view = ()=>{
    setDisplay(!display)
  }
  const [prevMonth,nextMonth,value,onChange] = useMonth()

   const[input,setInput,data,setData] = useCreateEvent();

  return (
    <div className="App">
      <Header view = {view} onChange = {onChange} value = {value} prevMonth ={prevMonth} nextMonth = {nextMonth}/>
      <div className="features">
        <LeftNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth} input={input} setInput={setInput} data={data} setData={setData}/>
        <RightNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth} input={input} setInput={setInput} data={data} setData={setData}/>
      </div>
    </div>
  );
}

export default App;
