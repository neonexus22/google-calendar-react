import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const regex = /bg-(indigo|gray|green|blue|red|purple)-\d+/;

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => {
        const checkboxColor = `text-${lbl.match(regex)[1]}-600`;
        const checkBoxClass = `w-5 h-5 mr-2 ${checkboxColor} bg-gray-100 border-gray-300 rounded focus:ring-red-500`;
        console.log({ checkboxColor });
        return (
          <label key={idx} className="items-center mt-3 block">
            <input
              type="checkbox"
              name={checkboxColor}
              checked={checked}
              className={checkBoxClass}
              onChange={() => updateLabel({ label: lbl, checked: !checked })}
            />
            <span className="capitalize text-gray-700">
              {lbl.match(regex)[1]}
            </span>
          </label>
        );
      })}
    </React.Fragment>
  );
};

export default Labels;
