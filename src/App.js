import React from "react";
import "./App.css";
import "./styles/styles.scss";
import LeftNavigation from "./components/leftComponents/LeftNavigation";
import RightNavigation from "./components/rightComponents/RightNavigation";
import Header from "./components/header/Header";
import { ReferenceDataContextProvider } from "../src/components/context/ReferenceDataContext";
import { ServicesContextProvider } from "./components/Axios/ServicesContext";
import { RightNavContextProvider } from "./components/context/RightNavContext";

function App() {
  return (
    <div className="App">
      <ReferenceDataContextProvider>
        <Header />
        <div className="features">
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
