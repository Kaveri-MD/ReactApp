import { createContext, useContext } from "react";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { parseISO } from "date-fns";

const ServicesContext = createContext();

const ServicesContextProvider = ({ children }) => {
  const {
    setData,
    setCurrentDate,
    setError
  } = useContext(ReferenceDataContext);

  const getAll = async () => {
    // const getEVent = await getAllEvent();
    // getEVent && setData(getEVent,...data)
    const response = await axios.get("http://localhost:5169/appointments");
    setData(response.data);
  };
  const getByName = async (event) => {
    const response = await axios.get(
      `http://localhost:5169/appointments/event?Event=${event}`
    );
    // setSelect(response.data);
    console.log(response.data, "event");

    setCurrentDate(parseISO(response.data.fromTime));
    // getAll()
  };

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
        // console.log(error.response.data);
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
      value={{ getAll, getByName, create, updateEvent, deleteEvent }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export { ServicesContext, ServicesContextProvider };
