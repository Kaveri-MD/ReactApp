import { createContext, useContext } from "react";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { format, formatISO, parseISO } from "date-fns";
import moment from "moment";
import { RightNavContext } from "../context/RightNavContext";

const ServicesContext = createContext();

const ServicesContextProvider = ({ children }) => {
  const { setData,currentDate, setCurrentDate, setError,setGetDate } =
    useContext(ReferenceDataContext);
   
    const date=formatISO(currentDate).slice(0,10);
    console.log(date);
  const getAll = async () => {
    const response = await axios.get("http://localhost:5169/appointments");
    setData(response.data);
  };
  const getByName = async (event) => {
    const response = await axios.get(
      `http://localhost:5169/appointments/event?Event=${event}`
    );
    console.log(response.data, "event");
    setCurrentDate(parseISO(response.data.fromTime));
  };

  const getByDate =async ()=>{
    const response =await axios.get(`http://localhost:5169/appointments/date?Date=${date}`);
    // console.log(response.data);
    setGetDate(response.data)
    
  }

  const create = async (createItem) => {
    await axios
      .post("http://localhost:5169/appointments", createItem)
      .catch((error) => {
        setError(error.response.data);
      });
    setCurrentDate(parseISO(createItem.fromTime));
    getAll();
  };

  const updateEvent = async (editItem) => {
    await axios
      .put(`http://localhost:5169/appointments`, editItem)
      .catch((error) => {
        setError(error.response.data);
      });
    setCurrentDate(parseISO(editItem.fromTime));
    getAll();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`http://localhost:5169/appointments/event/${id}`);
    getAll();
  };

  return (
    <ServicesContext.Provider
      value={{ getAll, getByName, getByDate,create, updateEvent, deleteEvent }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
