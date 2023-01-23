import React, { useContext } from "react";
import { useState } from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import moment from "moment";
import uuid from "react-uuid";
import { parseISO } from "date-fns";
import { ServicesContext } from "../Axios/ServicesContext";
import "../../styles/leftNavigation/createModal.scss"

function CreateModal(props) {
  const { modal, setModal } = props;
  const { data, setError, getId, setIcon, setGetId } =
    useContext(ReferenceDataContext);
  const { create, updateEvent } = useContext(ServicesContext);

  const filteredEvent = data.filter((item) => {
    return item.id === getId;
  });

  const handleInput = () => {
    return getId
      ? {
          title: filteredEvent[0].eventName,
          date: filteredEvent[0].fromTime.slice(0, 10),
          from: filteredEvent[0].fromTime.slice(11, 16),
          to: filteredEvent[0].toTime.slice(11, 16),
        }
      : { title: "", date: "", from: "", to: "" };
  };

  const [input, setInput] = useState(handleInput());

  const UpdateItem = () => {
    const editItem = {
      id: filteredEvent[0].id,
      eventName: input.title,
      fromTime: moment(
        input.date + "" + input.from,
        "YYYY-MM-DDTHH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss"),
      toTime: moment(input.date + "" + input.to, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    };
    if (parseISO(editItem.fromTime) < new Date()) {
      setError("Meeting does not allowed for past");
    } else {
      updateEvent(editItem);
      setInput("");
      // setIcon(false);
    }
    setGetId("");
  };
  const CreateEvent = () => {
    const createItem = {
      id: uuid(),
      eventName: input.title,
      fromTime: moment(
        input.date + "" + input.from,
        "YYYY-MM-DDTHH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss"),
      toTime: moment(input.date + "" + input.to, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYY-MM-DDTHH:mm:ss"
      ),
    };
    if (parseISO(createItem.fromTime) < new Date()) {
      setError("Meeting does not allowed for past");
    } else {
      create(createItem);
      setInput("");
    }
  };
  const addInput = (e) => {
    getId ? UpdateItem() : CreateEvent();
    setModal(false);
  };
  const close = () => {
    setModal(false);
    console.log(modal);
    setInput("");
    setGetId("");
  };
  return (
    <div>
      <div className="modal-content">
        <div className="add">NEW EVENT</div>
        <form onSubmit={addInput}>
          <div className="title">
            <div className="title-text">Title</div>
            <input
              type="text"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            ></input>
          </div>
          <div className="date">
            <div className="date-text">Date</div>
            <input
              type="date"
              value={input.date}
              onChange={(e) => setInput({ ...input, date: e.target.value })}
            ></input>
          </div>
          <div className="from-time">
            <div className="from-text">From</div>
            <input
              type="time"
              value={input.from}
              onChange={(e) => setInput({ ...input, from: e.target.value })}
            ></input>
          </div>
          <div className="to-time">
            <div className="to-text">To</div>
            <input
              type="time"
              value={input.to}
              onChange={(e) => setInput({ ...input, to: e.target.value })}
            ></input>
          </div>
        </form>
        <button className="primary-button" onClick={close}>
          Close
        </button>
        <button className="primary-button" onClick={addInput}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateModal;
