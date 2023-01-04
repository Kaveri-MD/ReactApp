import React ,{useState}from "react";
import "./App.css";
import "./styles/styles.scss";
import {sub,add} from "date-fns";
import LeftNavigation from "./leftComponents/LeftNavigation";
import RightNavigation from "./rightComponents/RightNavigation";
import Header from "./components/Header";
import useMonth from "../src/components/Hooks/useMonth"


function App() {
  const [display, setDisplay] = useState(true);
  const view = ()=>{
    setDisplay(!display)
  }
  const [prevMonth,nextMonth,value,onChange] = useMonth()

  return (
    <div className="App">
      <Header view = {view} onChange = {onChange} value = {value} prevMonth ={prevMonth} nextMonth = {nextMonth}/>
      <div className="features">
        <LeftNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth}/>
        <RightNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth}/>
      </div>
    </div>
  );
}

export default App;
