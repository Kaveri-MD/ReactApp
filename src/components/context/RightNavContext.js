import { useState, createContext, useContext } from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { subDays } from "date-fns";

const RightNavContext = createContext();

const RightNavContextProvider = ({ children }) => {
  const [icon, setIcon] = useState(false);
  const [update, setUpdate] = useState(false);
  const [popup, setPopup] = useState(false);

  const { setModal, setEvent, currentDate, setError } =
    useContext(ReferenceDataContext);

  const Delete = () => {
    setIcon(false);
    setPopup(!popup);
    setEvent(false);
  };
  const Update = () => {
    currentDate > subDays(new Date(), 1)
      ? setModal(true)
      : setError("Event can't be created - Time has passed");
    setIcon(false);
    setEvent(false);
  };

  return (
    <RightNavContext.Provider
      value={{
        icon,
        setIcon,
        update,
        setUpdate,
        popup,
        setPopup,
        Delete,
        Update,
      }}
    >
      {children}
    </RightNavContext.Provider>
  );
};

export { RightNavContext, RightNavContextProvider };
