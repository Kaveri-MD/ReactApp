import { useState, createContext ,useContext} from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";

const RightNavContext = createContext();

const RightNavContextProvider = ({ children }) => {
  const [icon, setIcon] = useState(false);
  const [update, setUpdate] = useState(false);
  const [popup, setPopup] = useState(false);

  // const[isDelete,setIsDelete] =useState(false);
  const { setModal,setEvent,setGetId } = useContext(ReferenceDataContext);

  const Delete = () => {
    setIcon(false);
    setPopup(!popup);
    setEvent(false);
    // setGetId("")
    // setIsDelete(!isDelete)
  };
  // {!isDelete && setEvent(false)}
  const Update = () => {
    setIcon(false);
    setModal(true);
    setEvent(false);
  };

  return (
    <RightNavContext.Provider
      value={{ icon, setIcon, update, setUpdate, popup, setPopup, Delete ,Update }}
    >
      {children}
    </RightNavContext.Provider>
  );
};

export { RightNavContext, RightNavContextProvider };
