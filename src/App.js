import React ,{useState}from "react";
import "./App.css";
import "./styles/styles.scss";
import {sub,add} from "date-fns";
import LeftNavigation from "./components/leftComponents/LeftNavigation";
import RightNavigation from "./components/rightComponents/RightNavigation";
import Header from "./components/Header";
import  {  ReferenceDataContextProvider } from "../src/components/context/ReferenceDataContext"



function App() {
  // const {contextdata}
  //  const [prevMonth,nextMonth,value,onChange] = useMonth()

  //  const[input,setInput,data,setData] = useCreateEvent();
  // fetch("https://type.fit/api/quotes")
  // .then((response)=>response.json)
  // .then((result)=>console.log(result.data));
  

  return (
    <div className="App">
      <ReferenceDataContextProvider>
      <Header />
      <div className="features">
        <LeftNavigation />
        <RightNavigation />
      </div>
      {/* <Header view = {view} onChange = {onChange} value = {value} prevMonth ={prevMonth} nextMonth = {nextMonth}/>
      <div className="features">
        <LeftNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth} input={input} setInput={setInput} data={data} setData={setData}/>
        <RightNavigation display= {display} value = {value} onChange = {onChange} prevMonth ={prevMonth} nextMonth = {nextMonth} input={input} setInput={setInput} data={data} setData={setData}/>
      </div> */}
      </ReferenceDataContextProvider>
    </div>
  );
}

export default App;
