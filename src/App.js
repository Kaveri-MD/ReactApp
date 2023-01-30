import React, { useState } from "react";
import "./App.css";
import "./styles/styles.scss";
import { sub, add } from "date-fns";
import LeftNavigation from "./components/leftComponents/LeftNavigation";
import RightNavigation from "./components/rightComponents/RightNavigation";
import Header from "./components/header/Header";
import { ReferenceDataContextProvider } from "../src/components/context/ReferenceDataContext";
import { ServicesContextProvider } from "./components/Axios/ServicesContext";
import { RightNavContextProvider } from "./components/context/RightNavContext";

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
        <div className="features" >
          <ServicesContextProvider>
            <LeftNavigation />
            <RightNavContextProvider>
              <RightNavigation />
            </RightNavContextProvider>
          </ServicesContextProvider>
        </div>
      </ReferenceDataContextProvider>
    </div>
  );
}

export default App;
