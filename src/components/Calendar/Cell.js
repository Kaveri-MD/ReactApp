import React from "react";
import "../../styles/calendar.scss"

function Cell(props){
    const isActive = props.isActive
    
    return(
         <div  className={isActive?"today":undefined}> 
            {props.children}
        </div>
    )
}

export default Cell;
