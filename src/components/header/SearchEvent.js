import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ReferenceDataContext } from "../context/ReferenceDataContext";

function SearchEvent() {
  const { value, data, getId, setGetId, select, setSelect,setCurrentDate} =
    useContext(ReferenceDataContext);
  // const [select, setSelect] = useState("");
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

  const handleFilter =(e)=>{
    // setSearch(e.target.search)
    const searchWord = e.target.value;
    setSearch(searchWord)
    const filter = data.filter((item)=>{
    return item.eventName.toLowerCase().includes(searchWord.toLowerCase())
      
    });
    (searchWord === "") ? setFilterData([]) : setFilterData(filter);

    // if(searchWord === ""){
    //   setFilterData([]);
    // }
    // else{
    //   setFilterData(filter);

    // }
    // console.log(searchWord)
  }
  const getEvent = (event) => {
    // const searchWord= event;
    setFilterData([])
    setSearch(event)
    axios
    .get(`http://localhost:5169/appointments/event?Event=${event}`)
    .then((response)=>{
      setSelect(response.data);
    })
    setCurrentDate(select.fromTime.slice(0,10))
  };
  console.log(select.fromTime)
  return (
    <div className="suggestion-container">
      <form className="search-box" >
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
      {
        (filterData.length !== 0) &&(
      <div className="suggestion-box">
        {filterData.map((item) => (
            <div className="suggestion" onClick={()=>getEvent(item.eventName)}>{item.eventName}</div>
          ))}
      </div>
        )
      }
    </div>
  );
}

export default SearchEvent;
