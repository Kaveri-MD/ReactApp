import { useState, createContext } from "react";

const RightNavContext = createContext();

const RightNavContextProvider=({ children })=>{
    const [icon, setIcon] = useState(false);
    const [update, setUpdate] = useState(false);
    const [popup, setPopup] = useState(false);

    const Delete = () => {
        setIcon(false);
        setPopup(!popup);
      };

    return(
        <RightNavContext.Provider value={{icon, setIcon,update, setUpdate,popup, setPopup,Delete}}>
            {children}
        </RightNavContext.Provider>
    );
}


export {RightNavContext,RightNavContextProvider}