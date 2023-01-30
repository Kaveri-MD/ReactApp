import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import { parseISO } from "date-fns";
import moment from "moment";
import "../../styles/header/searchEvent.scss";

function SearchEvent() {
  const { data, setCurrentDate,search, setSearch,display, setDisplay } = useContext(ReferenceDataContext);

  const [filterData, setFilterData] = useState([]);

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setSearch(searchWord);
    const filter = data.filter((item) => {
      return item.eventName.toLowerCase().includes(searchWord.toLowerCase());
    });
    searchWord === "" ? setFilterData([]) : setFilterData(filter);
  };
  const getEvent = async (event) => {
    setDisplay(false);
    setFilterData([]);
    setSearch(event);
    const response = await axios.get(
      `http://localhost:5169/appointments/event?Event=${event}`
    );
    
    setCurrentDate(parseISO(response.data.fromTime));
  };
  

  return (
    <div className="suggestion-container">
      <form className="search-box">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input
          className="text-area"
          type="text"
          placeholder="Search by event title"
          value={search}
          onChange={handleFilter}
        ></input>
      </form>
      {filterData.length === 0 && search.length !== 0 && display === true ? (
        <div className="suggestion-box">
          <div className="suggestion">No event found</div>
        </div>
      ) : (
        <div className="suggestion-box">
          {filterData.map((item) => (
            <div
              className="suggestion"
              onClick={() => getEvent(item.eventName)}
            >
              <div>{item.eventName}</div>
              <div>{moment(item.fromTime).format("Do MMM")}</div>
              {console.log(moment(item.fromTime).format("Do MMM"))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEvent;
