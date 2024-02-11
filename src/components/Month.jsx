import React from "react";
import Day from "./Day";

const Month = ({ month }) => {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month?.map((week, index) => (
        <React.Fragment key={index}>
          {week.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={index} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
