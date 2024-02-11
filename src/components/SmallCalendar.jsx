import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../util";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";

const SmallCalendar = () => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const getCurrentDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    return currDay === nowDay
      ? "bg-blue-500 text-white rounded-full"
      : slcDay === currDay
      ? "bg-blue-100 rounded-full text-blue-500 font-bold"
      : "";
  };

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold w-8/12">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <p className="w-4/12 flex space-x-2 text-gray-500 flex justify-end">
          <button onClick={() => setCurrentMonthIdx((prev) => prev - 1)}>
            <FaChevronLeft />
          </button>
          <button onClick={() => setCurrentMonthIdx((prev) => prev + 1)}>
            <FaChevronRight />
          </button>
        </p>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getCurrentDayClass(day)}`}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
