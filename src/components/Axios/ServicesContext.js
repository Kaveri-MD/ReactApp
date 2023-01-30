import { createContext, useContext } from "react";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { format, parseISO } from "date-fns";
import { getHelper } from "./AppHelper";

const ServicesContext = createContext();

const ServicesContextProvider = ({ children }) => {
  const {
    setData,
    currentDate,
    setCurrentDate,
    setError,
    setGetDate,
    getDate,
  } = useContext(ReferenceDataContext);

  const date = format(currentDate, "yyyy-MM-dd");
  const getAll = async () => {
    const response = await axios.get(getHelper("appointments"));
    setData(response.data);
  };
  const getByName = async (event) => {
    const response = await axios.get(
      getHelper(`appointments/event?Event=${event}`)
    );
    setCurrentDate(parseISO(response.data.fromTime));
  };

  const getByDate = async () => {
    const response = await axios.get(
      getHelper(`appointments/date?Date=${date}`)
    );
    setGetDate(response.data);
    console.log(getDate);
  };

  const create = async (createItem) => {
    await axios.post(getHelper("appointments"), createItem).catch((error) => {
      setError(error.response.data);
    });
    setCurrentDate(parseISO(createItem.fromTime));
    getAll();
  };

  const updateEvent = async (editItem) => {
    await axios.put(getHelper("appointments"), editItem).catch((error) => {
      setError(error.response.data);
    });
    setCurrentDate(parseISO(editItem.fromTime));
    getAll();
  };

  const deleteEvent = async (id) => {
    await axios.delete(getHelper(`appointments/event/${id}`));
    getAll();
    getByDate();
  };

  return (
    <ServicesContext.Provider
      value={{ getAll, getByName, getByDate, create, updateEvent, deleteEvent }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
