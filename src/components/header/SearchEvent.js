import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import moment from "moment";
import { formatISO, getMonth, parse, parseISO, set, setDate,format } from "date-fns";

function SearchEvent() {
  const {
    currentDate,
    data,
    getId,
    setGetId,
    select,
    setSelect,
    setCurrentDate,
  } = useContext(ReferenceDataContext);
  const [error, setError] = useState(true);
  const [search, setSearch] = useState("");

  const [filterData, setFilterData] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5169/appointments/event?Event=${search}`)
  //     .then((response) => {
  //       // setHint(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error.response.data);
  //     });
  // }, [search]);
  // // console.log(error,'errormessage');
  // const SearchItem = (item, event) => {
  //   setSearch("");
  //   // setGetId(id);
  //   // setSearch("")
  //   setSelect([item]);
  //   // setHint([item]);
  // };
  // // console.log(getId);

  // console.log(select, "selected event");
  // // console.log(hint);
  // // console.log(object);
  // // var length=search.length;

  // // console.log(axios.get("http://localhost:5169/appointments/event?Event=meet"))

  const handleFilter = (e) => {
    // setSearch(e.target.search)
    const searchWord = e.target.value;
    setSearch(searchWord);
    const filter = data.filter((item) => {
      return item.eventName.toLowerCase().includes(searchWord.toLowerCase());
    });
    searchWord === "" ? setFilterData([]) : setFilterData(filter);

    // if(searchWord === ""){
    //   setFilterData([]);
    // }
    // else{
    //   setFilterData(filter);

    // }
    // console.log(searchWord)
  };
  const getEvent = async (event) => {
    // const searchWord= event;
    setError(false);
    setFilterData([]);
    setSearch(event);
    const response = await axios.get(
      `http://localhost:5169/appointments/event?Event=${event}`
    );
    // setSelect(response.data);
    console.log(response.data.fromTime)
    
    wordEntered(response.data.fromTime);
    // setCurrentDate(parseISO(select.fromTime));
    
    // .then (()=>{
      
      
      // const date = setDate(currentDate,select.fromTime);
      // setCurrentDate(date);
      
      // )
    };
    // console.log(format(select.fromTime,"yyyy-mm-dd"))
  const wordEntered = (date) => {
    // select &&(
    //   )
    console.log(date,"date")
    setCurrentDate(parseISO(date))
    // setSearch("")
    // console.log(select.fromTime,"hi")
  };
  // console.log(select.fromTime,"bye")
  // setCurrentDate(parseISO(select.fromTime));
  // const d = parseISO(select.fromTime);
  // console.log(set(new Date(),parseISO(select.fromTime)),"date");
  return (
    <div className="suggestion-container">
      <form className="search-box">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input
          className="text-area"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleFilter}
        ></input>
        {/* {console.log(search)} */}
      </form>
      {(filterData.length === 0 && search.length !== 0 && error === true) ? (
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
              {item.eventName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEvent;
