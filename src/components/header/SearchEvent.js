import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchEvent() {
  return (
    <div>
      <div className="search-box">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input className="text-area" type="text" placeholder="Search"></input>
      </div>
    </div>
  );
}

export default SearchEvent;
