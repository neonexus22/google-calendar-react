import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl to-gray-500 font-bold"> Calendar</h1>
      <button className="border rounded py-2 px-4 mr-5" onClick={handleReset}>
        Today
      </button>
      <button
        className="py-2 px-4 mr-5 text-gray-600"
        onClick={() => setMonthIndex((prev) => prev - 1)}
      >
        <FaChevronLeft />
      </button>
      <button
        className="py-2 px-4 mr-5 text-gray-600"
        onClick={() => setMonthIndex((prev) => prev + 1)}
      >
        <FaChevronRight />
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalendarHeader;
