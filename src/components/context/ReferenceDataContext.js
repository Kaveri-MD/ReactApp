import { useState, createContext } from "react";
import { sub, add } from "date-fns";

const ReferenceDataContext = createContext();

const ReferenceDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [getId, setGetId] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [select, setSelect] = useState([]);
  const [day, setDay] = useState(false);
  const [error, setError] = useState('');
  const [errorPopUp, setErrorPopUp] = useState(false);
  const [modal, setModal] = useState(false);
  const [angle, setAngle] = useState(false);
  const [monthAngle, setMonthAngle] = useState(false);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(true);
  const [event, setEvent] = useState(false);
  const [getDate,setGetDate]= useState();
  const [filteredData, setFilteredData] = useState(false);

  const prevMonth = () => {
    setCurrentDate(sub(currentDate, { months: 1 }));
  };

  const nextMonth = () => {
    setCurrentDate(add(currentDate, { months: 1 }));
  };



  return (
    <ReferenceDataContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        prevMonth,
        nextMonth,
        data,
        setData,
        getId,
        setGetId,
        select,
        setSelect,
        day,
        setDay,
        error,
        setError,
        errorPopUp,
        setErrorPopUp,
        modal,
        setModal,angle, setAngle,monthAngle, setMonthAngle,search, setSearch,display, setDisplay,event, setEvent,getDate,setGetDate,filteredData, setFilteredData
      }}
    >
      {children}
    </ReferenceDataContext.Provider>
  );
};

export { ReferenceDataContext, ReferenceDataContextProvider };
