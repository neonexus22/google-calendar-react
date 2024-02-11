import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchCalEvent: ({ type, payload }) => {},
  selectedEvent: null,
  setSelectedEvent: (event) => {},
  labels: [],
  setLabels: () => {},
  updateLabel: (label) => {},
  filterdEvents: [],
});

export default GlobalContext;
