import React, { useEffect, useMemo, useReducer, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

const savedEventsReducer = (state, { type, payload }) => {
  switch (type) {
    case "PUSH":
      return [...state, payload];
    case "UPDATE":
      console.log({ payload });
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "DELETE":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error("Invalid action type");
  }
};

function initEvents() {
  const storageEvents = localStorage.getItem("saved-events");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

const ContextWrapper = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filterdEvents = useMemo(() => {
    return savedEvents.filter((evt) => {
      return labels.find((lbl) => lbl.label === evt.label)?.checked;
    });
  }, [savedEvents, labels]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    localStorage.setItem("saved-events", JSON.stringify(savedEvents));
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.name === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  function updateLabel(label) {
    setLabels((prevLabels) => {
      return prevLabels.map((lbl) => (lbl.label === label.label ? label : lbl));
    });
  }

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filterdEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
