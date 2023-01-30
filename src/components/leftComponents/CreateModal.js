import React, { useContext } from "react";
import { useState } from "react";
import { ReferenceDataContext } from "../context/ReferenceDataContext";
import moment from "moment";
import uuid from "react-uuid";
import { formatISO, parseISO, subMinutes } from "date-fns";
import { ServicesContext } from "../Axios/ServicesContext";
import "../../styles/leftNavigation/createModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function CreateModal(props) {
  const { setModal } = props;
  const { data, setError, getId, setGetId, currentDate } =
    useContext(ReferenceDataContext);
  const { create, updateEvent } = useContext(ServicesContext);
  const [field, setField] = useState(false);

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
      : {
          title: "",
          date: formatISO(currentDate).slice(0, 10),
          from: "",
          to: "",
        };
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

    if (parseISO(editItem.fromTime) < subMinutes(new Date(), 1)) {
      setError("Event can't be created - Time has passed");
    } else {
      updateEvent(editItem);
      setInput("");
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
    if (parseISO(createItem.fromTime) < subMinutes(new Date(), 1)) {
      setError("Event can't be created - Time has passed");
    } else {
      create(createItem);
      setInput("");
    }
  };
  const addInput = (e) => {
    if ((input.title && input.from && input.to) === "") {
      setField(true);
      setModal(true);
    } else {
      getId ? UpdateItem() : CreateEvent();
      setModal(false);
    }
  };
  const close = () => {
    setModal(false);
    setInput("");
    setGetId("");
  };

  return (
    <div>
      <div className="modal-content">
        <div className="add">{getId ? "EVENT" : "NEW EVENT"}</div>
        <form onSubmit={addInput}>
          <div className="title">
            <div className="title-text">Title</div>
            <input
              type="text"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
            ></input>
            {field && input.title === "" && (
              <div className="form-error">
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="form-error-angle"
                />
                <div className="form-error-text">
                  Please fill out this field !!
                </div>
              </div>
            )}
          </div>

          <div className="date">
            <div className="date-text">Date</div>
            <input
              type="date"
              value={input.date}
              onChange={(e) => setInput({ ...input, date: e.target.value })}
              min={moment(new Date()).format("yyyy-MM-DD")}
            ></input>
          </div>
          <div className="from-time">
            <div className="from-text">From</div>
            <input
              type="time"
              value={input.from}
              onChange={(e) => setInput({ ...input, from: e.target.value })}
            ></input>
            {field && input.from === "" && (
              <div className="form-error">
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="form-error-angle"
                />
                <div className="form-error-text">
                  Please fill out this field !!
                </div>
              </div>
            )}
          </div>
          <div className="to-time">
            <div className="to-text">To</div>
            <input
              type="time"
              value={input.to}
              onChange={(e) => setInput({ ...input, to: e.target.value })}
            ></input>
            {field && input.to === "" && (
              <div className="form-error">
                <FontAwesomeIcon
                  icon={faCaretUp}
                  className="form-error-angle"
                />
                <div className="form-error-text">
                  Please fill out this field !!
                </div>
              </div>
            )}
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
